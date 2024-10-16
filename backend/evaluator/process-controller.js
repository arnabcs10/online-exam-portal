const { spawn } = require('child_process');


// online-exam-portal\backend\evaluator\document-similarity-checker.py
function compute(docfiles){
 
    const process = spawn('python', ['./backend/evaluator/document-similarity-checker.py', JSON.stringify(docfiles)]);

    return  new Promise((resolve, reject) => {
        process.stdout.on('data', (data) => {
            // console.log(data.toString());
            result =data.toString() ;
            const res = JSON.parse(result);

            resolve(res);
        });
        process.stderr.on('data', (data) => {
            reject(data.toString());
        })
    
        process.on('close', (code) => {
            console.log("process ended with code:",code);
        })
    })
       

}


module.exports =  compute;