//Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const colors = require('colors');

// Import Routes
const examinerRoutes = require('./routes/examinerRoutes');
const groupRoutes = require('./routes/groupRoutes');
const studentRoutes = require('./routes/studentRoutes');

//Middlewares
const { notFound,errorHandler} = require('./middlewares/errorMiddleware');

//App config
const app = express();
dotenv.config();
app.use(express.json()) //body-parser


//Database connection
connectDB();

//Routes
//Home

// /api/route/
app.use('/api/examiners',examinerRoutes);
app.use('/api/groups',groupRoutes);
app.use('/api/students',studentRoutes);


if(process.env.NODE_ENV === 'production'){
    // send index.html file at production
    
}else{
    app.get('/',(req,res)=>{
        res.send("API is running...");
    });
}


//error handler
app.use(notFound);
app.use(errorHandler);

//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});