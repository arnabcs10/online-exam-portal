import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


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
    TableCell,
    TableBody,
    IconButton,
    TableRow,
    Divider
} from '@material-ui/core';
import MatxLoading from 'app/components/MatxLoading/MatxLoading';
import Message from './CustomSnackbar';
import { SimpleCard } from 'app/components'
import {getExamDetails, getExamResults, computeExamResults} from 'app/redux/actions/ExamActions';

const QuestionCard = (props) => {
    const { qid, text, answer, mark, studentResponse } = props;
    
    
    return (
        <Grid container spacing={2}>
            <Grid item md={10} xs={12}>
                <div className='text-small font-light'> Question </div>
                <p>
                    {text}
                </p>
                <Divider  />
            </Grid>
            <Grid item md={2} xs={12}>
                <div className='text-small font-light'> Marks </div>
                <p>
                    {mark}
                </p>
                <Divider  />
            </Grid>
            <Grid item md={10} xs={12}>                
                <div className='text-small font-light'> Answer Key </div>
                <p>
                    {answer}
                </p>
               
                <Divider  />
            </Grid>
            <Grid item md={2} xs={12}>                
                <div className='text-small font-light'> Marks Obtained</div>
                <p>
                    {studentResponse.markAssigned}
                </p>
                <Divider  />
                
            </Grid>
            <Grid item md={10} xs={12}>                
                <div className='text-small font-light'> Answer </div>
                <p>
                    {studentResponse.text}
                </p>
               
                
            </Grid>
            <Grid item md={2} xs={12}>                
                <div className='text-small font-light'> Plagiarism %age</div>
                <p className={`text-center ${studentResponse.plagiarismValue === 0 ? "bg-light-green":"bg-light-error"}`}>
                    {studentResponse.plagiarismValue}%
                </p>
                <Divider  />
                
            </Grid>
            <Grid item md={12} xs={12} className="text-right align-middle" style={{marginTop:"-15px"}}>
                <Divider  />
                {/* You can put button or icon here to denote plagarism detection enabled */}
                
            </Grid>
        </Grid>
    )
}

const TestDashboard = () => {
    const dispatch = useDispatch();
    const {classId, testId, studentId} = useParams();
    
   
    // const [questionSheet, setQuestionSheet] = useState({
    //     questionsArray:[],
    //     sumMarks:0,
    //     totalQuestions:0
    // });

    

    const classState = useSelector(state => state.classStore);
    const {  classDetails } = classState;

    
    const examState = useSelector(state => state.examStore);
    const { loading, message, examDetails, results } = examState;
    
    const studentResult = results.find(res => res.studentId === studentId);
    const studentDetails = classDetails.studentsEnrolled.find(st => st._id === studentId);

    const [answerSheetChecked, setAnswerSheetChecked] = useState(false);
    const handleAnswerSheetChecked = () => {
        setAnswerSheetChecked(st => !st);
    }
    useEffect(() => {
        // if(!examDetails || examDetails._id != testId){
            dispatch(getExamDetails(testId));
            
        // }
        dispatch(getExamResults(testId));
    }, [dispatch,testId]);
    
    
    
    return (loading ? (<MatxLoading/>):(
        <div className="analytics m-sm-30">
            
            {message && (<Message variant={message.variant} message={message.content}/>)}
            <Container maxWidth="md">
            <Grid container spacing={2}>
               
                <Grid item md={12} xs={12} >
                    <SimpleCard elevation={3} className="h-full" title={examDetails.name}>
                    <Grid container spacing={2}>
                    <Grid item md={6} xs={12} >
                        <Table className="whitespace-pre">                    
                                <TableBody>
                                   
                                        <TableRow key="name">
                                            <TableCell className="px-0 font-bold" align="left">
                                                Name:
                                            </TableCell>
                                            <TableCell className="px-0" align="left">
                                               {studentDetails.name}
                                            </TableCell>                                
                                        </TableRow>
                                        
                                        <TableRow key="email">
                                            <TableCell className="px-0 font-bold" align="left">
                                                Email:
                                            </TableCell>
                                            <TableCell className="px-0" align="left">
                                               {studentDetails.email}
                                            </TableCell>                                
                                        </TableRow>
                                        <TableRow key="section">
                                            <TableCell className="px-0 font-bold" align="left">
                                                Section:
                                            </TableCell>
                                            <TableCell className="px-0" align="left">
                                                {classDetails.section}
                                            </TableCell>                                
                                        </TableRow>
                                    <TableRow key="subject">
                                        <TableCell className="px-0 font-bold" align="left">
                                            Subject:
                                        </TableCell>
                                        <TableCell className="px-0" align="left">
                                            {classDetails.subject}
                                        </TableCell>                                
                                    </TableRow>
                                        
                                        
                                  
                                </TableBody>
                        </Table>
                    </Grid>
                    <Grid item md={6} xs={12} >
                        <Table className="whitespace-pre">                    
                            <TableBody>
                                <TableRow key="rollnumber">
                                    <TableCell className="px-0 font-bold" align="left">
                                        Roll Number:
                                    </TableCell>
                                    <TableCell className="px-0" align="left">
                                        {studentDetails.rollNumber}
                                    </TableCell>                                
                                </TableRow>
                                <TableRow key="marks">
                                    <TableCell className="px-0 font-bold" align="left">
                                        Marks:
                                    </TableCell>
                                    <TableCell className="px-0 font-bold" align="left">
                                        {studentResult.marks}
                                    </TableCell>                                
                                </TableRow>
                                <TableRow key="isChecked">
                                    <TableCell className="px-0 font-bold" align="left">
                                        Answer Sheet Checked: 
                                    </TableCell>
                                    <TableCell className="px-0 font-bold" align="left">
                                        <Checkbox
                                            checked={answerSheetChecked}
                                            onChange={handleAnswerSheetChecked}                                            
                                            color="primary"                                            
                                        />
                                    </TableCell>                                
                                </TableRow>
                            </TableBody>
                        </Table>   
                    </Grid>
                    </Grid>
                        
                      
                    </SimpleCard>
                </Grid>

                <Grid item md={12} xs={12} >
                    <SimpleCard elevation={3} className="h-full" title="Answers">                  
                    <Grid container spacing={2} style={{backgroundColor :"#e0e0e0"}}>
                        {examDetails.questions && examDetails.questions.map((que,index) => (
                            
                            <Grid item md={12} xs={12} >
                                <SimpleCard elevation={3} className="h-full" title={`Question: ${index+1}`}>  
                                    
                                    <QuestionCard 
                                        qid={que.qid} 
                                        text={que.text}
                                        answer={que.answer}
                                        mark={que.mark}    
                                        studentResponse={studentResult.answers[index]}                                
                                    />
                                                            
                                </SimpleCard>                  
                            </Grid>                    
                        ))}
                    </Grid>
                    </SimpleCard>
                </Grid>                                                     
               
            </Grid>
            </Container>
        </div>
    ))
}

export default TestDashboard
