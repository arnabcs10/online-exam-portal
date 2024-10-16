const mongoose = require('mongoose');


const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    // password:{
    //     type:String,
    //     required:true
    // },
    rollNumber:{
        type:String,
        required:true,
        // unique:true
    },
    groupsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Group'
        }
    ],

    
},{
    timestamps:true
});



const Student = mongoose.model('student',studentSchema);

module.exports = Student;