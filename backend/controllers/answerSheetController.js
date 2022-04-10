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
                const newSheet = await AnswereSheet.create({                    
                    examId,
                    studentId,
                    timeLeft: exam.duration,
                    marks: 0,
                    answers : []
                });
                exam.questions.forEach((q,index) => {
                    const ans = {
                        qid: q.qid,
                        questionNumber: index+1,
                        text: "",
                        markAssigned: 0
                    }
                    newSheet.answers.push(ans);
                })
                await newSheet.save();
                const createdSheet = await AnswereSheet.find({examId: examId, studentId: studentId}).populate('examId');
                
                console.log(newSheet);
                res.status(201);
                res.json(createdSheet[0]);
            }
            
            
        } catch (error) {
            console.log(error.message);
            res.status(500);
            throw new Error(error.message);
        }
    }
);


module.exports = { getAnswerSheet };