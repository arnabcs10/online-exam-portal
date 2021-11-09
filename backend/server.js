//Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const colors = require('colors');

// Import Routes

//Middlewares


//App config
const app = express();
dotenv.config();
app.use(express.json()) //body-parser


//Database connection


//Routes
//Home
if(process.env.NODE_ENV === 'production'){
    // send index.html file at production
    
}else{
    app.get('/',(req,res)=>{
        res.send("API is running...");
    });
}



//error handler

//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});