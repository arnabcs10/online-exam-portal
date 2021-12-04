import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { v4 as uuid } from 'uuid';
import xlsx from 'xlsx';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from '@material-ui/pickers'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
    Card,
    Button,
    Icon,
    Fab,
    Grid,
    CardMedia,
    Container,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core'
import QuestionCard from './QuestionCard';
import { SimpleCard } from 'app/components'


const TestForm = () => {
    const [state, setState] = useState({
        name:'',
        description:'',
        startTime: new Date(),
        endTime: new Date(),
        duration: '',
        totalMarks: 0,
        numberOfQuestions: 0,
        questions:[]
    });
    const [fileName, setFileName] = useState('');
    const [questionSheet, setQuestionSheet] = useState({
        questionsArray:[],
        sumMarks:0,
        totalQuestions:0
    });

    const classState = useSelector(state => state.classStore);
    const { loading, message, classDetails } = classState;

    const addQuestion = () => {
        setState(state => {
            const questions = state.questions.map(ques => ques);
            questions.push({
                qid:uuid(),
                text:'',
                answer:'',
                mark: 0
            })
            return {...state, numberOfQuestions: questions.length, questions};
        });
    }

    const updateAndSaveQuestion = (ques) => {
        setState(state => {
            let countMarks = 0;
            const questions = state.questions.map(q => {
                if(q.qid === ques.qid){
                    countMarks+= ques.mark;
                    return ques;
                }else{
                    countMarks+= q.mark;
                    return q;
                }
            });
            
            return {...state,totalMarks:countMarks, questions};
        });

    }
    const deleteQuestion = (ques) => {
        setState(state => {
            const questions = state.questions.filter((q) => q.qid !== ques.qid);
            
            return {...state,totalMarks:state.totalMarks-ques.mark, numberOfQuestions: questions.length, questions};
        });
    }
    const handleChange = (event) => {
        event.persist()
        let val = event.target.value;
        if(event.target.name === 'duration')
        {
            val = Number(val);
        }
        setState({
            ...state,
            [event.target.name]: val,
        })
    }
    const handleStartTimeChange = (startTime) => {
        setState({ ...state, startTime })
    }
    const handleEndTimeChange = (endTime) => {
        setState({ ...state, endTime })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitted");
        console.log(state);
        // dispatch();
        
        setState({
            name:'',
            description:'',
            startTime: new Date(),
            endTime: new Date(),
            duration: '',
            totalMarks: 0,
            numberOfQuestions: 0,
            questions:[]
        });
        handleSheetCancel();
    }
    const inputExcel = (event) =>{
        console.log(event.target.files[0]);
        if(!event.target.files[0])
            return;
        setFileName(event.target.files[0].name);
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(event.target.files[0]);
        fileReader.onload = (event)=>{
            let data = event.target.result;
            let workbook = xlsx.read(data,{type:"binary"});
            workbook.SheetNames.forEach(sheet => {
                let rowObject = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);

                console.log(rowObject);
                if(!rowObject[0].question && !rowObject[0].answer && !rowObject[0].mark){
                    console.log("invalid file format");
                    return;
                }
                // NOTE: Incase of MCQ format needs to be changed [...st,...arrayQuestions]
                const arrayQuestions = [];
                let sum = 0;
                rowObject.forEach(element => {
                    const obj = {
                        text: element.question,
                        answer: element.answer,
                        mark: element.mark,
                        qid: uuid()
                    }
                    sum+= element.mark;
                    arrayQuestions.push(obj);
                })
                const numQues = arrayQuestions.length;
                setQuestionSheet(st => {
                    return {
                        questionsArray:[...arrayQuestions],
                        sumMarks:sum,
                        totalQuestions:numQues
                    }
                });
            });
        }
    }
    const handleSheetSubmit = ()=>{
        
        console.log(questionSheet);
        setState(st => {
            return {
                ...st,
                totalMarks: st.totalMarks+questionSheet.sumMarks,
                numberOfQuestions: st.numberOfQuestions+questionSheet.totalQuestions,
                questions:[
                    ...st.questions,
                    ...questionSheet.questionsArray
                ]
            }
        });

        // flush out studentarray state
        // setQuestionsArray([]);
        // flush out xl file - may be not needed
        // setFileName("");
    }
    const handleSheetCancel = ()=>{
        setQuestionSheet({
            questionsArray:[],
            sumMarks:0,
            totalQuestions:0
        });
        setFileName("");
    }
    return (
        <div className="analytics m-sm-30">
            <Container maxWidth="md">
            <ValidatorForm onSubmit={handleSubmit}>
            <Grid container spacing={2}>
               
                <Grid item md={12} xs={12} sx={{ width: '75%' }}>
                    <SimpleCard elevation={3} className="h-full" title="Test Paper">
                        
                        {/* <TextField className="mb-4 w-full"  id="test-name" label="Name" variant="standard" /> */}
                        <TextValidator
                            className="mb-4 w-full"
                            label="Name"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            value={state.name || ''}
                            validators={[
                                'required',
                            ]}
                            errorMessages={['this field is required']}
                        />
                        {/* <TextField
                            id="test-description"
                            label="Description"
                            placeholder="instructions..."
                            multiline
                            variant="standard"
                            className="mb-4 w-full"
                            /> */}
                       
                       <TextValidator
                            className="mb-4 w-full"
                            label="Description"
                            onChange={handleChange}
                            type="text"
                            placeholder="instructions..."
                            multiline
                            name="description"
                            value={state.description || ''}
                           
                        />                        
                        <Grid container spacing={2}>
                        <Grid item md={4} xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                                className="mb-4 w-full"
                                margin="none"
                                id="start-time"
                                label="Start time"
                                placeholder="start time"
                                inputVariant="standard"
                                type="text"
                                autoOk={true}
                                value={state.startTime}
                                onChange={handleStartTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item md={4} xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                                className="mb-4 w-full"
                                margin="none"
                                id="end-time"
                                label="End time"
                                placeholder="link expiry time"
                                inputVariant="standard"
                                type="text"
                                autoOk={true}
                                value={state.endTime}
                                onChange={handleEndTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item md={4} xs={12}>
                            {/* <TextField className="mb-4 w-full"  id="test-duration" label="duration(in mins)" variant="standard" /> */}
                            <TextValidator
                            className="mb-4 w-full"
                            label="duration(in mins)"
                            onChange={handleChange}
                            type="number"
                            name="duration"
                            value={state.duration}
                          
                        />
                        </Grid>

                        <Grid item md={8} xs={12}>
                            Number of Questions: {state.numberOfQuestions}
                        </Grid>

                        <Grid item md={4} xs={12}>
                            Total marks: {state.totalMarks}
                        </Grid>

                        <Grid item md={12} className="text-right">
                            <Button color="primary" variant="contained" type="submit">
                                Publish
                                <Icon className="ml-2">
                                    send
                                </Icon>                                
                            </Button>
                        </Grid>

                        </Grid>
                    </SimpleCard>
                </Grid>

                {state.questions.map((que,index) => (
                    <Grid item md={12} xs={12} key={que.qid}>
                        <SimpleCard elevation={3} className="h-full" title={`Question: ${index+1}`}>  
                            
                            <QuestionCard 
                                qid={que.qid} 
                                text={que.text}
                                answer={que.answer}
                                mark={que.mark}
                                updateAndSaveQuestion={updateAndSaveQuestion}
                                deleteQuestion={deleteQuestion}
                            />
                                                    
                        </SimpleCard>                  
                    </Grid>
                ))}

                <Grid item md={12} xs={12}>
                    <Card elevation={3} className="h-full text-center">
                        <div className=" px-4 py-3 mb-3   items-center bg-light-gray">
                            <Button color="primary" onClick={addQuestion}>
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
                            <div className="text-muted text-small pb-1 inline-block">file: {fileName}</div>
                                <div className="flex justify-center my-7">
                                    
                                    <Button component="label" color="primary" variant="outlined"> 
                                        <Icon>file_upload</Icon> 
                                        <input hidden type="file" id="input-excel" accept=".xls,.xlsx" 
                                        onChange = {inputExcel} 
                                        color="primary" variant="contained" />
                                    </Button>
                                    <Button className="mx-4" 
                                        onClick={handleSheetSubmit}  
                                        variant="contained" 
                                        color="primary">
                                            Submit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={handleSheetCancel}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                        </div>
                        
                    </Card>                    
                </Grid>
                
                
                
               
            </Grid>
            </ValidatorForm >
            </Container>
        </div>
    )
}

export default TestForm
