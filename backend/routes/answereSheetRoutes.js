const express = require('express');
const router = express.Router();

// import controllers
const {
    getAnswerSheet,
    updateAnswerSheet,
    answerSheetEvaluation
} = require('../controllers/answerSheetController');

// import middlewares
const { protect } = require('../middlewares/authMiddleware');

//routes /api/answers/
// protect the route later **
router.route('/:examId/:studentId').get( getAnswerSheet);
router.route('/evaluation/:examId').put( answerSheetEvaluation);
router.route('/:answerSheetId').put( updateAnswerSheet);




module.exports = router;