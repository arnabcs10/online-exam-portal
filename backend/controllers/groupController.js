const asynHandler = require('express-async-handler');
const Group = require('../models/group');

//@desc create new group
//@route POST /api/groups
//@access Private

const createGroup = asynHandler(
    async (req, res) => {
        try {
            const {name, section, subject, description} = req.body;
            const group = new Group({
                name, 
                section, 
                subject, 
                description,
                strength : 0,
                examinerId: req.examiner._id
            });
            const createdGroup = await group.save();
            res.status(201);
            res.json(createdGroup);
            
        } catch (error) {
            console.log(error.message);
            res.status(500);
            throw new Error(error.message);
        }
    }
);

//@desc fetch all groups belongs to a examiner
//@route GET /api/groups
//@access Private

const getGroups = asynHandler(
    async (req, res) => {
        const groups = await Group.find({examinerId: req.examiner._id});

        if(groups){

            res.json(groups);
        }else{
            res.status(404);
            throw new Error('No class found');
        }
    }
);

//@desc fetch a group by Id, belongs to an examiner
//@route GET /api/groups/:id
//@access Private

const getGroupById = asynHandler(
    async (req, res) => {
        const group = await Group.findById(req.params.id);

        if(group){

            res.json(group);
        }else{
            res.status(404);
            throw new Error('No class found');
        }
    }
);



module.exports = {createGroup, getGroups, getGroupById };