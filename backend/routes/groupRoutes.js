const express = require('express');
const router = express.Router();

// import controllers
const {
    createGroup, 
    getGroups,
    getGroupById
} = require('../controllers/groupController');

// import middlewares
const { protect } = require('../middlewares/authMiddleware');

//routes /api/groups/
router.route('/').post(protect, createGroup);
router.route('/').get(protect, getGroups);
router.route('/:id').get(protect, getGroupById);


module.exports = router;