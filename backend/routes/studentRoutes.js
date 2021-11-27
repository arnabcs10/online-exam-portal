const express = require('express');
const router = express.Router();

// import controllers
const {
    addStudent,
    addManyStudents
} = require('../controllers/studentController');

// import middlewares
const { protect } = require('../middlewares/authMiddleware');

//routes /api/students/
router.route('/').post(protect, addStudent);
router.route('/many').post(protect, addManyStudents);



module.exports = router;