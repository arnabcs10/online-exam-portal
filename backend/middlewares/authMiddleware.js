const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Examiner = require('../models/examiner');

const protect = asyncHandler(
    async (req, res, next) => {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

            try {
                token = req.headers.authorization.split(' ')[1];

                const decodedPayLoad = jwt.verify(token, process.env.JWT_SECRET);

                req.examiner = await Examiner.findById(decodedPayLoad.id).select('-password');

                next();
            } catch (error) {
                console.error(error);
                res.status(401);
                throw new Error('Not authorized, token failed');
            }
            
        }else{
            res.status(401);
            throw new Error('Not authorized, no token');
        }
    }
);

module.exports = { protect };