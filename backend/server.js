//Import dependencies
const express = require('express');

const path = require('path');


// Import Routes

//Middlewares


//App config
const app = express();

//body-parser
app.use(express.json()) 


//Database connection


//Routes
//Home


app.get('/',(req,res)=>{
    res.send("API is running...");
});




//error handler

//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});