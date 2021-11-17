const express = require('express');
const router = express.Router();

// import controllers
const {
    registerExaminer,
    authExaminer,
    getExaminerProfile
} = require('../controllers/examinerController');

// import middlewares
const { protect } = require('../middlewares/authMiddleware');

//routes /api/examiners/
router.route('/').post(registerExaminer);

router.route('/login').post(authExaminer);

router.route('/profile').get(protect, getExaminerProfile);

module.exports = router;