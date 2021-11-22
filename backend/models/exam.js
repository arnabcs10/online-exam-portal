const mongoose = require('mongoose');


const examSchema = mongoose.Schema({
    // _id:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group',
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    startTime:{
        type: Date,
        required:true
    },
    endTime:{
        type: Date,
        required:true
    },
    duration:{
        type:Number,
    },
    questionPaperId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'QuestionPaper',
        required:true,
    }
    
},{
    timestamps:true
});



const Exam = mongoose.model('exam',examSchema);

module.exports = Exam;