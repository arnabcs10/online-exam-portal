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
module.exports = {createExam, getExamById, getAllExamsByGroupId};