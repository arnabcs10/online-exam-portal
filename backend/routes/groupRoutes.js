const express = require('express');
const router = express.Router();

// import controllers
const {
    createGroup, 
    getGroups
} = require('../controllers/groupController');

// import middlewares
const { protect } = require('../middlewares/authMiddleware');

//routes /api/groups/
router.route('/').post(protect, createGroup);
router.route('/').get(protect, getGroups);


module.exports = router;