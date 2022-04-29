const asyncHandler = require('express-async-handler');
const Exam = require('../models/exam');
const AnswereSheet = require('../models/answereSheet');
const evaluator = require('../evaluator/index');

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
                    attempted: false,
                    marks: 0,
                    answers : []
                });
                exam.questions.forEach((q,index) => {
                    const ans = {
                        qid: q.qid,
                        questionNumber: index+1,
                        text: "",
                        markAssigned: 0,
                        plagiarismCheck: true, // q.plagiarismCheck
                        plagiarismValue: 0
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



// @desc Update Answers and timeLeft
// @route PUT /api/answers/:answerSheetId/
// @access Private
const updateAnswerSheet = asyncHandler(
    async (req, res) => {
        try {
            const {answerSheetId} = req.params;
            const { answers, timeLeft, attempted} = req.body;

            const sheet = await AnswereSheet.findById(answerSheetId);
            if(sheet )
            {
                sheet.answers = answers;
                sheet.timeLeft = timeLeft;   
                sheet.attempted = attempted;
                
                const updatedSheet = await sheet.save();
                
                console.log(sheet);
                res.status(200);
                res.json(updatedSheet);
            }
            else{
                res.status(404);
                throw new Error("Something went wrong. Try again.");
            }
            
            
        } catch (error) {
            console.log(error.message);
            res.status(500);
            throw new Error(error.message);
        }
    }
);

// @desc API to detect plagiarism and auto-answer checking
// @route PUT /api/answers/evaluation/:examId
// @access Private
const answerSheetEvaluation = asyncHandler(
    async (req, res) => {
        try {
            const {examId} = req.params;
            
            const sheets = await AnswereSheet.find({examId: examId});
            const exam = await Exam.findById(examId);
            if(sheets.length > 0 )
            {
                const { plagiarismMatrix, markMatrix} = await evaluator(sheets,exam);

                // updating individual students answer sheet with marks and plagiarism Value
                for(let sheetIndex=0; sheetIndex<sheets.length; sheetIndex++)
                {
                    let totalMarks = 0;
                    for(let qIndex=0; qIndex<exam.numberOfQuestions; qIndex++)
                    {
                        sheets[sheetIndex].answers[qIndex].plagiarismValue = plagiarismMatrix[qIndex][sheetIndex];
                        sheets[sheetIndex].answers[qIndex].markAssigned = markMatrix[qIndex][sheetIndex];
                        totalMarks += markMatrix[qIndex][sheetIndex];
                    }
                    sheets[sheetIndex].marks = totalMarks;
                    await sheets[sheetIndex].save();
                }

                res.status(200);
                res.json(sheets); // updated sheet
            }
            else{
                res.status(404);
                throw new Error("Something went wrong. Try again.");
            }
            
            
        } catch (error) {
            console.log(error.message);
            res.status(500);
            throw new Error(error.message);
        }
    }
);


module.exports = { getAnswerSheet, updateAnswerSheet, answerSheetEvaluation };