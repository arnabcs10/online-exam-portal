const mongoose = require('mongoose');


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
    marks:{
        type:Number,
        default:0
    },
    answeres:[
        {
            questionNumber:{type:Number},
            text:{ type:String },
            markAssigned: {type:Number, default:0}
        }
    ],
    
    
},{
    timestamps:true
});



const AnswereSheet = mongoose.model('answereSheet',answereSheetSchema);

module.exports = AnswereSheet;






// while updating answeres[] from student add unanswered ans also.