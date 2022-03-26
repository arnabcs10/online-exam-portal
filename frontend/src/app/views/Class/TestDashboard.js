import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import 'date-fns'
import {
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
import TestPaperPanel from './TestPaperPanel';
import { SimpleCard } from 'app/components'


const TestDashboard = () => {
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

    const classState = useSelector(state => state.classStore);
    const { loading, message, classDetails } = classState;

    

    
  
    
    
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
    
    
    
    return (
        <div className="analytics m-sm-30">
            <Container maxWidth="md">
            <Grid container spacing={2}>
               
                <Grid item md={12} xs={12} sx={{ width: '75%' }}>
                    <SimpleCard elevation={3} className="h-full" title="Test Paper">
                        
                        <p>
                        End-term exam for the course IR (UCS07E11) is scheduled on 10.12.2021.

                        The maximum mark of the examination is 50 and duration is 2 hrs. The examination will be conducted through Pen & Paper Mode. I will share the question paper in the google classroom under the “Test” tab before 5 minutes of the scheduled time.

                        The paper will include objective and descriptive type questions. You have to write answers on your own copy. Then you scan all the answer sheets, prepare a single PDF file and submit it to the same link where question paper is uploaded. 

                        During your examination you have also to be logged in to the following Google meet link with your camera ON (follow separate link for NIT and IIIT students). During examination, observers from the examination section will also join for invigilation.
                        </p>
                                               
                     
                        <Grid container spacing={2}>
                        <Grid item md={4} xs={12} >     
                                                   
                          <span className="font-bold"><Icon className='pt-1 mr-2 '>event</Icon>Start Time: </span> March 23rd 08:07 p.m.
                        </Grid>
                        <Grid item md={4} xs={12}>
                        
                        <span className="font-bold"><Icon className='pt-1 mr-2 '>event</Icon>End Time: </span> March 23rd 08:07 p.m.
                        </Grid>

                        <Grid item md={4} xs={12}>
                        
                        <span className="font-bold"><Icon className='pt-1 mr-2 '>schedule</Icon>Duration: </span> 120 minutes.
                        </Grid>

                        <Grid item md={8} xs={12}>
                        <span className="font-bold">Number of Questions: </span> {state.numberOfQuestions}
                        </Grid>

                        <Grid item md={4} xs={12}>
                        <span className="font-bold">Total marks: </span> {state.totalMarks}
                        </Grid>

                        <Grid item md={12} className="text-right">
                            <Button color="primary" variant="outlined" >
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
                  <TestPaperPanel questions={questions}/>                  
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
                            {classDetails.studentsEnrolled.map((student) => (
                                <TableRow key={student._id}>
                                    <TableCell className="px-0" align="left">
                                        {student.rollNumber}
                                    </TableCell>
                                    <TableCell className="px-0" align="left">
                                        {student.name}
                                    </TableCell>
                                    <TableCell className="px-0" align="left">
                                        10
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
                            ))}
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
    )
}

export default TestDashboard
