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
            let docfiles = [];
            docfiles.push(exam.questions[i].answer);

            sheets.forEach(st => {
                docfiles.push(st.answers[i].text);
            });

            const plagValueVector = [];
            const markVector = [];
            
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
        }
        const result = {
            plagiarismMatrix,
            markMatrix
        }
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }

    // return sheets;
}



module.exports = evaluator;