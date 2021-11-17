const mongoose = require('mongoose');


const examinerSchema = mongoose.Schema({
    _id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    
},{
    timestamps:true
});



const Examiner = mongoose.model('examiner',examinerSchema);

module.exports = Examiner;