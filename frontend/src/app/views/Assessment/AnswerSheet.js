import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import useAuth from 'app/hooks/useAuth'
import {getTestDetails} from 'app/redux/actions/TestActions';
import {
    Grid,
    Container,
    Icon,
    Fab,
    Button,
    MenuItem,
    Menu
} from '@material-ui/core';
import QuestionAnswerForm from './QuestionAnswerForm';
import { SimpleCard } from 'app/components';


const AnswerSheet = () => {
  const {
    isAuthenticated,
    user
} = useAuth();
const dispatch = useDispatch();

const testState = useSelector(state => state.testStore);
const { loading, message, status, testDetails } = testState;


    const options = [...Array(testDetails.examId.numberOfQuestions).keys()].map((val) => val+1)


    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index)
        setAnchorEl(null)
    }

    const handleMenuClose=() =>{
        setAnchorEl(null)
    }
  return (
    <div className="analytics m-sm-30 ">
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                    {testDetails && (
                        <Grid item md={12} xs={12} sx={{ width: '75%' }}>
                            <SimpleCard elevation={3} className="h-full" title={testDetails.examId.name}>
                        
                                <p>
                                {testDetails.examId.description}
                                </p>
                                                    
                            
                                <Grid container spacing={2}>                        

                                <Grid item md={10} xs={12}>
                                    <span className="font-bold">Number of Questions: </span> {testDetails.examId.numberOfQuestions}
                                </Grid>

                                <Grid item md={2} xs={12} >
                                    <span className="font-bold ">Total marks: </span> {testDetails.examId.totalMarks}
                                </Grid> 

                                {/* <Grid item md={12} xs={12} className="text-center text-24"> */}
                                <div className="text-center text-24"
                                  style={{
                                    position:"fixed",
                                    left:"40vw",
                                    top:"10px",
                                    zIndex:"100"
                                  }}
                                >
                                <span className="font-bold">Time Left: </span> {testDetails.timeLeft} minutes
                                </div>
                                {/* </Grid> */}

                                                          

                                </Grid>
                            </SimpleCard>
                        </Grid>
                    )}
                        <Grid item md={12} xs={12} sx={{ width: '75%' }}>
                            <SimpleCard elevation={3} className="h-full" title={"Question Paper"}>
                                <Grid item md={12} xs={12} className="text-right mb-2" style={{marginTop:"-35px"}}>
                                        <Button variant='outlined' color="primary" onClick={handleClickListItem}>
                                        Go to Question: {options[selectedIndex]}
                                        </Button>
                                        <Menu
                                            id="lock-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                            PaperProps={{
                                                style: {
                                                    maxHeight: 48 * 4.5,
                                                    width: 170,
                                                },
                                            }}
                                        >
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}                                                    
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                >
                                                   <span >Question: {option}</span> 
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Grid>
                                <Grid item md={12} xs={12} >
                                <QuestionAnswerForm 
                                    qid={testDetails.examId.questions[selectedIndex].qid} 
                                    text={testDetails.examId.questions[selectedIndex].text}
                                    answer={testDetails.examId.questions[selectedIndex].answer}
                                    mark={testDetails.examId.questions[selectedIndex].mark}
                                    index={selectedIndex}
                                />
                               </Grid> 
                            </SimpleCard>
                        </Grid>
                    </Grid>            
                </Container>            
            </div>
  )
}

export default AnswerSheet