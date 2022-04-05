const express = require('express');
const router = express.Router();

// import controllers
const {
    getAnswerSheet
} = require('../controllers/answerSheetController');

// import middlewares
const { protect } = require('../middlewares/authMiddleware');

//routes /api/answers/
// protect the route later **
router.route('/:examId/:studentId').get( getAnswerSheet);




module.exports = router;