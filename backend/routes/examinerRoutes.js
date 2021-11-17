const express = require('express');
const router = express.Router();

// import controllers
const {
    registerExaminer,
    authExaminer,
    getExaminerProfile
} = require('../controllers/examinerController');

// import middlewares

router.route('/').post(registerExaminer);

router.route('/login').post(authExaminer);



module.exports = router;