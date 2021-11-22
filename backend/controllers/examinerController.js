const asyncHandler = require('express-async-handler');
const Examiner = require('../models/examiner');
const generateToken = require('../utils/generateToken');
// const generateUUID = require('../utils/generateUUID');

//@desc Register examiner
//@route POST /api/examiners
//@access Public

const registerExaminer = asyncHandler(
    async (req, res) => {
        const { name, email, password } = req.body;

        const examinerExist = await Examiner.findOne({email});
        if(examinerExist){
            res.status(400);
            throw new Error('User already exist');
        }

        // const id = generateUUID();
        const examiner = await Examiner.create({
            // _id: id,
            name,
            email,
            password
        });

        if(examiner){
            res.status(201);
            res.json({
                _id: examiner._id,
                name: examiner.name,
                email: examiner.email,
                token: generateToken(examiner._id)
            });
        }else{
            res.status(400);
            throw new Error('Invalid user data');
        }
    }
);


//@desc Auth examiner and get token
//@route POST /api/examiners/login
//@access Public

const authExaminer = asyncHandler(
    async (req, res) => {
        const {email, password} = req.body;

        const examiner = await Examiner.findOne({email: email});
        if(examiner && (await examiner.matchPassword(password))){
            res.json({
                _id: examiner._id,
                name: examiner.name,
                email: examiner.email,
                token: generateToken(examiner._id)
            });
        }else{
            res.status(401);
            throw new Error('Invalid email or password');
        }
    }
);



//@desc GET examiner profile
//@route GET /api/examiners/profile
//@access Private

const getExaminerProfile = asyncHandler(
    async (req, res) => {

        if(req.examiner)
        {
            const {_id, name, email} = req.examiner;
            res.json({
                _id,
                name,
                email
            });
        }else{
            res.status(404);
            throw new Error('User not found');
        }
    }
);

module.exports = {registerExaminer, authExaminer, getExaminerProfile};