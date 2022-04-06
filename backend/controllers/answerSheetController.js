const asyncHandler = require('express-async-handler');
const Exam = require('../models/exam');
const AnswereSheet = require('../models/answereSheet');


// @desc Create new AnswereSheet
// @route GET /api/answers/:examId/:studentId
// @access Private
const getAnswerSheet = asyncHandler(
    async (req, res) => {
        try {
            const {examId, studentId} = req.params;
            
            const sheet = await AnswereSheet.find({examId: examId, studentId: studentId}).populate('examId');
            if(sheet.length )
            {
                console.log(sheet[0]);
                res.json(sheet[0]);
            }
            else{
                const exam = await Exam.findById(examId);
                const sheet = new AnswereSheet({                    
                    examId,
                    studentId,
                    timeLeft: exam.duration,
                    marks: 0,
                    answers :[]
                });
                const createdSheet = await sheet.save();
                console.log(createdSheet);
                res.status(201);
                res.json(createdSheet);
            }
            
            
        } catch (error) {
            console.log(error.message);
            res.status(500);
            throw new Error(error.message);
        }
    }
);


module.exports = { getAnswerSheet };