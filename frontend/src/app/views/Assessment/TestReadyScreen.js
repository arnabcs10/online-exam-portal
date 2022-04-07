import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import useAuth from 'app/hooks/useAuth'
import {getTestDetails} from 'app/redux/actions/TestActions';
import {
    Grid,
    Container,
    Icon,
    Fab,
    Button
} from '@material-ui/core';
import { SimpleCard } from 'app/components';
const info = {
    "_id": "624c5dc6d4071cea1b9591b9",
    "studentId": "61a1b17dfc99ffbef95bbb1e",
    "examId": {
        "_id": "6241826aa3fbbdb9543a4767",
        "groupId": "61a09cca1e1973421e5d3df3",
        "name": "DS Test 1",
        "description": "End-term exam for the course DS (UCS07E11) is scheduled on 1.04.2022.\n\nThe maximum mark of the examination is 10 and duration is 2 hrs. The examination will be conducted through Pen & Paper Mode. I will share the question paper in the google classroom under the “Test” tab before 5 minutes of the scheduled time.\n\nThe paper will include objective and descriptive type questions. You have to write answers on your own copy. Then you scan all the answer sheets, prepare a single PDF file and submit it to the same link where question paper is uploaded. \n\nDuring your examination you have also to be logged in to the following Google meet link with your camera ON (follow separate link for NIT and IIIT students). During examination, observers from the examination section will also join for invigilation.",
        "startTime": "2022-04-01T04:30:00.000Z",
        "endTime": "2022-04-01T06:36:00.000Z",
        "duration": 120,
        "totalMarks": 10,
        "numberOfQuestions": 2,
        "questions": [
            {
                "qid": "9c251d56-167d-4df0-a960-b6311433e3b4",
                "text": "What is an Array ?",
                "answer": "An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together. This makes it easier to calculate the position of each element by simply adding an offset to a base value, i.e., the memory location of the first element of the array (generally denoted by the name of the array).",
                "mark": 5,
                "_id": "6241826aa3fbbdb9543a4768"
            },
            {
                "qid": "9e7dfe69-a091-4f62-8844-fcafff2dd3ec",
                "text": "What is a String ?",
                "answer": "A string is generally considered as a data type and is often implemented as an array data structure of bytes (or words) that stores a sequence of elements, typically characters, using some character encoding. String may also denote more general arrays or other sequence (or list) data types and structures.",
                "mark": 5,
                "_id": "6241826aa3fbbdb9543a4769"
            }
        ],
        "createdAt": "2022-03-28T09:39:54.759Z",
        "updatedAt": "2022-03-28T09:39:54.759Z",
        "__v": 0
    },
    "timeLeft": 120,
    "marks": 0,
    "answeres": [],
    "createdAt": "2022-04-05T15:18:30.873Z",
    "updatedAt": "2022-04-05T15:18:30.873Z",
    "__v": 0
};
const TestReadyScreen = () =>{
    const {
        isAuthenticated,
        user
    } = useAuth();
    const dispatch = useDispatch();
    const { testId } = useParams();

    const testState = useSelector(state => state.testStore);
    const { loading, message, status, testDetails } = testState;

    // const [testDetails, setTestDetails] = useState(null)

    const displayMessage = testDetails ? "" : "Test is ready to start";
    const subDisplayMessage = testDetails ? "You can start the test when you are ready" : "Please click to load the Test Paper ";

    const handleFetchTestPaper = () => {
        dispatch(getTestDetails(testId,user.id));
        // setTestDetails(info);

    }

    return (
        <div className="analytics m-sm-30">
                <Container maxWidth="sm">
                    <Grid container spacing={2}>
                    {testDetails && (
                        <Grid item md={12} xs={12} sx={{ width: '75%' }}>
                            <SimpleCard elevation={3} className="h-full" title={testDetails.examId.name}>
                        
                                <p>
                                {testDetails.examId.description}
                                </p>
                                                    
                            
                                <Grid container spacing={2}>
                                {/* <Grid item md={5} xs={12} >     
                                
                        
                                <span className="font-bold">Start Time: </span> 
                                </Grid>
                                <Grid item md={4} xs={12}>
                                
                                <span className="font-bold">End Time: </span> 
                                </Grid> */}

                                <Grid item md={9} xs={12}>
                                    <span className="font-bold">Number of Questions: </span> {testDetails.examId.numberOfQuestions}
                                </Grid>

                                <Grid item md={3} xs={12} >
                                    <span className="font-bold ">Total marks: </span> {testDetails.examId.totalMarks}
                                </Grid> 

                                <Grid item md={12} xs={12} className="text-center text-24">
                                
                                <span className="font-bold">Time Left: </span> {testDetails.timeLeft} minutes
                                </Grid>

                                                          

                                </Grid>
                            </SimpleCard>
                        </Grid>
                    )}
                        <Grid item md={12} xs={12} sx={{ width: '75%' }}>
                            <SimpleCard elevation={3} className="h-full">
                                
                                <Grid container spacing={2} className="text-center">
                                    <Grid item md={12} xs={12} > 
                                        {testDetails && (
                                            <Link to={`/assessment/${testId}/live`}>
                                            <Button className="bg-green font-bold text-white"  variant="contained" >
                                                Start
                                                <Icon className="ml-2">
                                                    send
                                                </Icon>                                
                                            </Button>
                                            </Link>
                                         )}

                                        {!testDetails && (<Button className="bg-light-green font-bold"  variant="contained" onClick={handleFetchTestPaper}>
                                            Load
                                            <Icon className="ml-2">
                                                autorenew
                                            </Icon>                                
                                        </Button>)} 
        
                                    </Grid>
                                    <Grid item md={12} xs={12} >                                 
                                        <div className="font-light text-24">
                                            {displayMessage}
                                        </div>
                                        
                                        <div className="font-light text-13">
                                            {subDisplayMessage}                                                                                        
                                        </div>
                                    </Grid>
                                </Grid>
                            </SimpleCard>
                        </Grid>
                    </Grid>            
                </Container>            
            </div>
    );
}

export default TestReadyScreen;