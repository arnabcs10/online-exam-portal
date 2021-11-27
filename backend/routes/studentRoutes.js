const express = require('express');
const router = express.Router();

// import controllers
const {
    addStudent
} = require('../controllers/studentController');

// import middlewares
const { protect } = require('../middlewares/authMiddleware');

//routes /api/students/
router.route('/').post(protect, addStudent);



module.exports = router;