const mongoose = require('mongoose');


const teacherSchema = mongoose.Schema({
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



const Teacher = mongoose.model('teacher',teacherSchema);

module.exports = Teacher;