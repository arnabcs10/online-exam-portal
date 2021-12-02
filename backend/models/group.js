const mongoose = require('mongoose');


const groupSchema = mongoose.Schema({
    // _id:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    name:{
        type:String,
        required:true
    },
    section:{
        type:String,
    },
    subject:{
        type:String,
    },
    description:{
        type:String,
    },
    examinerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'examiner'
    },
    strength:{
        type:Number
    },
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'student'
        }
    ],
    examsTaken:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'exam'
        }
    ]
    
},{
    timestamps:true
});



const Group = mongoose.model('group',groupSchema);

module.exports = Group;