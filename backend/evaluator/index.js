// const documentSimilarityChecker = require('./document-similarity-checker');
const compute = require('./process-controller');

const PLAG_THRESHOLD = 75;
const SIMILARITY_THRESHOLD = 25;

function plagiarismAdjustedMarks(plagValue, totalMark)
{
    if(plagValue === 0)
        return totalMark;
    let percentageDeduction = Math.ceil((plagValue - PLAG_THRESHOLD)/5)*10;

    let mark = totalMark - totalMark*(percentageDeduction/100);
    return mark;
}

async function evaluator(sheets, exam){
    const plagiarismMatrix = [];
    const markMatrix = [];
    try {
        let numberOfQuestions = exam.numberOfQuestions;
        let numSheets = sheets.length;
        for(let i=0; i<numberOfQuestions; i++)
        {
            const plagValueVector = [];
            const markVector = [];

            if(exam.questions[i].qtype === 'mcq'){
                // let sampleAnswer = exam.questions[i].answer.split('');
                let sampleAnswer = exam.questions[i].answer;
                sheets.forEach(st => {
                    if(st.answers[i].text === sampleAnswer){
                        markVector.push(exam.questions[i].mark);
                    }else{
                        markVector.push(0);
                    }
                    plagValueVector.push(0);
                });
                console.log(plagValueVector, markVector);
                plagiarismMatrix.push(plagValueVector);
                markMatrix.push(markVector);
                continue;
            }

            let docfiles = [];
            docfiles.push(exam.questions[i].answer);

            sheets.forEach(st => {
                docfiles.push(st.answers[i].text);
            });

            
            
            const {plagiarismVector, similarityVector} = await compute(docfiles);
            
            for(let studentIndex=1; studentIndex<=numSheets; studentIndex++)
            {
                let plagValue = 0;
                let mark = 0;
                if(plagiarismVector[studentIndex] >= PLAG_THRESHOLD)
                    plagValue = (plagiarismVector[studentIndex]);

                if(similarityVector[studentIndex] >= SIMILARITY_THRESHOLD)
                {
                    mark = plagiarismAdjustedMarks(plagValue,exam.questions[i].mark)
                }
                else{
                    mark = 0;
                }
                plagValueVector.push(plagValue);
                markVector.push(mark);
            }
            
            plagiarismMatrix.push(plagValueVector);
            markMatrix.push(markVector);

            console.log(plagValueVector, markVector);
        }
        const result = {
            plagiarismMatrix,
            markMatrix
        }
        console.log('res:',result);
        return result;
    } catch (error) {
        console.log('er');
        console.log(error);
    }

    // return sheets;
}



module.exports = evaluator;