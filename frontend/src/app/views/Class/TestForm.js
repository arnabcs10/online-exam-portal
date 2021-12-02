import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

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

import { SimpleCard } from 'app/components'


const TestForm = () => {
    const [state, setState] = useState({
        date: new Date(),
    })
  
    const classState = useSelector(state => state.classStore);
    const { loading, message, classDetails } = classState;

    const handleDateChange = (date) => {
        setState({ ...state, date })
    }
    return (
        <div className="analytics m-sm-30">
            <Container maxWidth="md">
            <Grid container spacing={2}>
               
                <Grid item md={12} xs={12} sx={{ width: '75%' }}>
                    <SimpleCard elevation={3} className="h-full" title="Test Paper">
                        
                        <TextField className="mb-4 w-full"  id="test-name" label="Name" variant="standard" />
                        <TextField
                            id="test-description"
                            label="Description"
                            placeholder="instructions..."
                            multiline
                            variant="standard"
                            className="mb-4 w-full"
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
                                value={state.date}
                                onChange={handleDateChange}
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
                                value={state.date}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item md={4} xs={12}>
                            <TextField className="mb-4 w-full"  id="test-duration" label="duration(in mins)" variant="standard" />
                        </Grid>

                        <Grid item md={8} xs={12}>
                            Number of Questions: {5}
                        </Grid>

                        <Grid item md={4} xs={12}>
                            Total marks: {10}
                        </Grid>

                        <Grid item md={12} className="text-right">
                            <Button color="primary" variant="contained" >
                                Publish
                                <Icon className="ml-2">
                                    send
                                </Icon>                                
                            </Button>
                        </Grid>

                        </Grid>
                    </SimpleCard>
                </Grid>

                <Grid item md={12} xs={12}>
                    <SimpleCard elevation={3} className="h-full" title={`Question: ${1}`}>  
                        <Grid container spacing={2}>
                            <Grid item md={8} xs={12}>
                                <TextField className="mb-4 w-full"  id="test-Question" label="Question" variant="standard" />
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <InputLabel id="question-type">Type</InputLabel>
                                <Select
                                    labelId="question-type"
                                    id="type"
                                    // value={age}
                                    // onChange={handleChange}
                                    label="type"
                                    className="mb-4 w-full"
                                    >
                                    
                                    <MenuItem value={'text'}>Short answer</MenuItem>
                                    <MenuItem value={'mcq'}>Multiple Choice</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item md={9} xs={12}>
                                <TextField className="mb-4 w-full"  id="answer-key" label="Answer Key" variant="standard" />
                            </Grid>
                            <Grid item md={2} xs={12}>
                                <TextField className="mb-4 ml-2 w-full"  id="points" label="Marks" variant="standard" />
                            </Grid>
                            <Grid item md={1} xs={12}>
                                <Icon className="mt-6 ml-2 cursor-pointer" color="error" variant="contained" >delete</Icon> 
                            </Grid>
                        </Grid>
                    </SimpleCard>                  
                </Grid>

                <Grid item md={12} xs={12}>
                    <Card elevation={3} className="h-full text-center">
                        <div className=" px-4 py-3 mb-3   items-center bg-light-gray">
                            <Button color="primary">
                                <Icon>
                                    add
                                </Icon>
                                Add question
                            </Button>
                            
                        </div>
                        
                        <div className="text-center font-medium mb-6">
                            Or Select a spreadsheet
                            <br />
                            <div className="text-muted text-small pb-1 inline-block">file: {'fileName'}</div>
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
                        </div>
                        
                    </Card>                    
                </Grid>
                
                
                
               
            </Grid>

            </Container>
        </div>
    )
}

export default TestForm
