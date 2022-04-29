const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    qid:{type:String},
    questionNumber:{type:Number},
    text:{ type:String },
    markAssigned: {type:Number, default:0},
    plagiarismCheck: {type:Boolean},
    plagiarismValue: {type: Number, default:0}
});

const answereSheetSchema = mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student',
        required:true,
    },
    examId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'exam',
        required:true,
    },
    timeLeft:{
        type:Number,
    },
    attempted:{
        type:Boolean,
        default: false
    },
    marks:{
        type:Number,
        default:0
    },
    answers:[
        answerSchema
    ],
    
    
},{
    timestamps:true
});



const AnswereSheet = mongoose.model('answereSheet',answereSheetSchema);

module.exports = AnswereSheet;






// while updating answeres[] from student add unanswered ans also.