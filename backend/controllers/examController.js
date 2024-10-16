const asyncHandler = require('express-async-handler');
const Exam = require('../models/exam');
// const Group = require('../models/group');

// @desc Create new Exam
// @route POST /api/exams
// @access Private
const createExam = asyncHandler(
    async (req, res) => {
        try {
            const {groupId, name, description, startTime, endTime, duration, totalMarks, numberOfQuestions, questions} = req.body;
            const exam = new Exam({
                name, 
                description,
                startTime,
                endTime, 
                duration, 
                totalMarks, 
                numberOfQuestions, 
                questions,
                groupId
            });
            const createdExam = await exam.save();
            res.status(201);
            res.json(createdExam);
            
        } catch (error) {
            console.log(error.message);
            res.status(500);
            throw new Error(error.message);
        }
    }
);

//@desc fetch exam details by Id, belongs to an examiner, group
//@route GET /api/exams/:id
//@access Private

const getExamById = asyncHandler(
    async (req, res) => {
        const exam = await Exam.findById(req.params.id);

        if(exam){

            res.json(exam);
        }else{
            res.status(404);
            throw new Error('No Test found');
        }
    }
);

//@desc fetch all exams by groupId, belongs to a group
//@route GET /api/exams/all/:groupId
//@access Private

const getAllExamsByGroupId = asyncHandler(
    async (req, res) => {
        const exam = await Exam.find({groupId: req.params.groupId});

        if(exam){

            res.json(exam);
        }else{
            res.status(404);
            throw new Error('No Test found');
        }
    }
);

//@desc Get exam status
// status = 0 : Not yet started
// status = 1 : active
// status = 2 : ended
//@route GET /api/exams/status/:id
//@access Private

const getExamStatus = asyncHandler(
    async (req, res) => {
        const exam = await Exam.findById(req.params.id);
        const currentTime = new Date();
        if(exam){
            let status = 2;
            console.log(currentTime);
            console.log(exam.startTime);
            console.log(exam.endTime);
                
            if(currentTime < exam.startTime)
            {
                status = 0;
            }
            else if(currentTime >= exam.startTime && currentTime <= exam.endTime)
            {
                status = 1;
            }
            else if(currentTime > exam.endTime)
            {
                status = 2;
            }

            res.status(200);
            res.json({
                status,
                currentTime,
                startTime: exam.startTime,
                endTime : exam.endTime
            });
            
        }else{
            res.status(404);
            throw new Error('No Test found');
        }
    }
);
module.exports = {createExam, getExamById, getAllExamsByGroupId, getExamStatus};