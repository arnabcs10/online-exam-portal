import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import 'date-fns'
import {
    Paper,
    Card,
    Button,
    Icon,
    Grid,
    Container,
    Checkbox,
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    TableRow,
} from '@material-ui/core';
import MatxLoading from 'app/components/MatxLoading/MatxLoading';
import Message from './CustomSnackbar';
import TestPaperPanel from './TestPaperPanel';
import AlertDialog from './AlertDialog';
import { SimpleCard } from 'app/components'
import {getExamDetails, getExamResults, computeExamResults} from 'app/redux/actions/ExamActions';

const TestDashboard = () => {
    const dispatch = useDispatch();
    const {classId, testId} = useParams();
    
    
    const questions = [{
        qid:uuid(),
        text:'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation',
        answer:'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation',
        mark: 5
    },
    {
        qid:uuid(),
        text:'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation',
        answer:'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation',
        mark: 2
    }
]
    const [state, setState] = useState({
        name:'',
        description:'',
        startTime: new Date().toString(),
        endTime: new Date().toString(),
        duration: '',
        totalMarks: 0,
        numberOfQuestions: 0,
        questions:[]
    });
   
    const [questionSheet, setQuestionSheet] = useState({
        questionsArray:[],
        sumMarks:0,
        totalQuestions:0
    });

    const [alertDialog, setAlertDialog] = useState({
        isOpen : false,
        title: "",
        content: ""
    });

    const classState = useSelector(state => state.classStore);
    const {  classDetails } = classState;

    
    const examState = useSelector(state => state.examStore);
    const { loading, message, examDetails, results } = examState;
    
    useEffect(() => {
        if(!examDetails || examDetails._id != testId){
            dispatch(getExamDetails(testId));
            
        }
        dispatch(getExamResults(testId));
    }, [dispatch,testId]);
    
    const evaluateAnswerSheets = () => {
        dispatch(computeExamResults(testId));
    }
    const handleAnswerEvaluation = () =>{
        setAlertDialog({
            isOpen: true,
            title: "Auto-checking might take time!",
            content: "Cancel if already checked to avoid recomputation. Please click confirm to re-evaluate.",
            onConfirm: evaluateAnswerSheets
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitted");
        console.log({...state, groupId: classDetails._id});
        // dispatch();
        
        setState({
            name:'',
            description:'',
            startTime: new Date().toString(),
            endTime: new Date().toString(),
            duration: '',
            totalMarks: 0,
            numberOfQuestions: 0,
            questions:[]
        });
       
    }
    
    let st = new Date(examDetails.startTime);
    st = examDetails.startTime.slice(0, 10) + ' ' + st.toLocaleTimeString();

    let et = new Date(examDetails.endTime);
    et = examDetails.endTime.slice(0, 10) + ' ' + et.toLocaleTimeString();
    
    return (loading ? (<MatxLoading/>):(
        <div className="analytics m-sm-30">
            <AlertDialog 
                alertDialog={alertDialog}
                setAlertDialog={setAlertDialog}                
            />
            {message && (<Message variant={message.variant} message={message.content}/>)}
            <Container maxWidth="md">
            <Grid container spacing={2}>
               
                <Grid item md={12} xs={12} sx={{ width: '75%' }}>
                    <SimpleCard elevation={3} className="h-full" title={examDetails.name}>
                        
                        <p>
                        {examDetails.description}
                        </p>
                                               
                     
                        <Grid container spacing={2}>
                        <Grid item md={5} xs={12} >     
                        {/* <Icon className='pt-1 mr-2 '>event</Icon> */}
                  
                          <span className="font-bold">Start Time: </span> {st}
                        </Grid>
                        <Grid item md={4} xs={12}>
                        
                        <span className="font-bold">End Time: </span> {et}
                        </Grid>

                        <Grid item md={3} xs={12}>
                        
                        <span className="font-bold">Duration: </span> {examDetails.duration} minutes
                        </Grid>

                        <Grid item md={9} xs={12}>
                        <span className="font-bold">Number of Questions: </span> {examDetails.numberOfQuestions}
                        </Grid>

                        <Grid item md={3} xs={12}>
                        <span className="font-bold">Total marks: </span> {examDetails.totalMarks}
                        </Grid>

                        <Grid item md={8} xs={12} style={{height:"50%"}}>
                                <Paper elevation={3} 
                                    className="p-2"
                                    style={{
                                        display:"flex", 
                                        backgroundColor:"#e0e0e0"                                        
                                    }}
                                >
                                    <div style={{width:"100%"}}>
                                    {`http://localhost:3000/assessment/${examDetails._id}`.slice(0,70) + "..."}
                                    </div>
                                    <Icon >
                                        content_copy
                                    </Icon> 
                                </Paper>                                                    
                        </Grid>

                        <Grid item md={4} className="text-right">
                            <Button color="primary" variant="outlined" onClick={handleAnswerEvaluation}>
                                Fetch Results
                                <Icon className="ml-2">
                                    autorenew
                                </Icon>                                
                            </Button>
                            <IconButton color="primary" variant="text" >
                                
                                <Icon className="ml-2">
                                    file_download
                                </Icon>                                
                            </IconButton>
                        </Grid>

                        </Grid>
                    </SimpleCard>
                </Grid>
                <Grid item md={12} xs={12} >
                <SimpleCard elevation={3} className="h-full" title="Question Paper">
                  <TestPaperPanel name={examDetails.name} questions={examDetails.questions}/>                  
                </SimpleCard>
                </Grid>

                <Grid item md={12} xs={12}>
                    <SimpleCard elevation={3} className="h-full text-center" title="Responses">  
                    <div className="w-full overflow-auto">
                    <Table className="whitespace-pre">
                        <TableHead>
                            <TableRow>
                                <TableCell className="px-0">Roll Number</TableCell>
                                <TableCell className="px-0">Name</TableCell>
                                <TableCell className="px-0">Marks</TableCell>
                                {/* <TableCell className="px-0">Email</TableCell>     */}
                                <TableCell className="px-0">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {classDetails.studentsEnrolled.map((student) => {
                                let studentResult = results.find(res => res.studentId === student._id);
                                return (
                                <TableRow key={student._id}>
                                    <TableCell className="px-0" align="left">
                                        {student.rollNumber}
                                    </TableCell>
                                    <TableCell className="px-0" align="left">
                                        {student.name}
                                    </TableCell>
                                    <TableCell className="px-0" align="left">
                                        {(studentResult && studentResult.attempted) ? studentResult.marks : "not attempted"}
                                    </TableCell>
                                    {/* <TableCell className="px-0" align="left">
                                        {student.email}
                                    </TableCell>                                     */}
                                    <TableCell className="px-0">
                                        <Button color="primary" variant="text" >
                                            Review
                                            <Icon className="ml-2">
                                                chevron_right
                                            </Icon>                                
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </div>                      
                         {/* <div className=" px-4 py-3 mb-3   items-center bg-light-gray">
                            <Button color="primary" >
                                <Icon>
                                    add
                                </Icon>
                                Add question
                            </Button>
                            
                        </div>
                        
                        <div className="text-center font-medium mb-6">
                            Or Select a spreadsheet
                            <br />
                            <div className="text-muted text-small pb-1 inline-block">Make sure you have the first row with column names as "question","answer" and "mark"</div>
                            <br />
                            <div className="text-muted text-small pb-1 inline-block">file: </div>
                                <div className="flex justify-center my-7">
                                    
                                    <Button component="label" color="primary" variant="outlined"> 
                                        <Icon>file_upload</Icon> 
                                        <input hidden type="file" id="input-excel" accept=".xls,.xlsx" 
                                        // onChange = {inputExcel} 
                                        color="primary" variant="contained" />
                                    </Button>
                                    <Button className="mx-4" 
                                        // onClick={handleSheetSubmit}  
                                        variant="contained" 
                                        color="primary">
                                            Submit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        // onClick={handleSheetCancel}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                        </div>  */}
                        
                    </SimpleCard>                    
                </Grid>
                
                
                
               
            </Grid>
            </Container>
        </div>
    ))
}

export default TestDashboard
