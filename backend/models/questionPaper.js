const mongoose = require('mongoose');


const questionPaperSchema = mongoose.Schema({
    // _id:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    instructions:{
        type:String,
        required:true
    },
    totalMarks:{
        type:Number,
        required:true,
    },
    numberOfQuestions:{
        type:Number,
        required:true
    },
    questions:[
        {
            questionNumber:{type:Number},
            text:{ type: String, required:true},
            mark:{type: Number, required:true}
        }
    ]   
    
},{
    timestamps:true
});



const QuestionPaper = mongoose.model('questionPaper',questionPaperSchema);

module.exports = QuestionPaper;