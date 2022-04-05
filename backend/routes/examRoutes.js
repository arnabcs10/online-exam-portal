const express = require('express');
const router = express.Router();

// import controllers
const {
    createExam,
    getExamById,
    getAllExamsByGroupId,
    getExamStatus
} = require('../controllers/examController');

// import middlewares
const { protect } = require('../middlewares/authMiddleware');

//routes /api/exams/
router.route('/').post(protect, createExam);
router.route('/:id').get(protect, getExamById);
router.route('/all/:groupId').get(protect, getAllExamsByGroupId);
router.route('/status/:id').get(getExamStatus);



module.exports = router;