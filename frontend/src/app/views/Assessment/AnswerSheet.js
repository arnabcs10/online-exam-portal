import React,{useState,useEffect, useRef, forwardRef, useImperativeHandle} from 'react'
import { Link, useHistory, useParams, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import useAuth from 'app/hooks/useAuth'
import {updateAnswerSheet} from 'app/redux/actions/TestActions';
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
import Message from '../Class/CustomSnackbar';

const Timer = forwardRef((props, ref) => {
    const { timeLeft } = props;
    // const [time, setTime] = useState(timeLeft);

    // useImperativeHandle(ref, () => ({getTime: () => {return time}}), [time]);

    // useEffect(() => {
    //     let currentTime = timeLeft;
    //     const clearId = setInterval(() =>{
    //         console.log(currentTime);
    //         setTime(currentTime);
    //         currentTime--;
    //         if(currentTime < 0)
    //         {
    //         clearInterval(clearId);
    //         }
    //     },1000);
    
    // }, [])
    const [time, setTime] = useState({
        minutes : timeLeft,
        seconds: 0
    });
    // const [ isOnline, setIsOnline ] = useState(navigator.onLine);
    // const [seconds, setSeconds ] =  useState(59);
    useImperativeHandle(ref, () => ({getTime: () => {return time.minutes}}), [time]);

    useEffect(()=>{
        
        let myInterval = setInterval(() => {
            
            let currMin = time.minutes;
            let currSec = time.seconds;
            // console.log(currMin,currSec);
                if (currSec > 0) {
                    currSec--;
                    setTime((t) => ({
                        minutes: t.minutes,
                        seconds: currSec
                    }));
                }
                if (currSec === 0) {
                    if (currMin === 0) {
                        clearInterval(myInterval)
                    } else {
                        currMin--;
                        setTime((t) => ({
                            minutes: currMin,
                            seconds: 59
                        }));
                    }
                } 
                
            }, 1000)

            if(navigator.onLine === false)
            {
                console.log(navigator.onLine);
                clearInterval(myInterval);
            }
            return ()=> {
                clearInterval(myInterval);
            };
    });
    
    return (
        <>
        {( navigator.onLine === false ) && (<Message variant="warning"  message={"You are offline! \nYou will be logged out of the system after sometime."}/>)}
        {(time.minutes === 4  ) && (<Message variant="error"  message={`Last 5 minutes left`}/>)}
        <div className="text-center text-24"
            style={{
            position:"fixed",
            left:"40vw",
            top:"10px",
            zIndex:"100"
            }}
        >
        <span className={`font-bold ${((time.minutes <= 4) ? "text-error" : "")}`}> Time Left: {time.minutes}:{time.seconds < 10 ?  `0${time.seconds}` : time.seconds} minutes</span>
        </div>
        </>
    );
})

const AnswerSheet = () => {
  const {
    isAuthenticated,
    user
} = useAuth();
const dispatch = useDispatch();
const { testId} = useParams();
// const history = useHistory();
const myRef = useRef();

const testState = useSelector(state => state.testStore);
const { loading, message, status, testDetails } = testState;

    // if(!testDetails)
    // {
    //     console.log("got to reload");
    //     let path = `/assessment/${testId}`;
    //     // history.push(path);  
    //     return <Redirect to={path}  />
    // }
    const [answers, setAnswers] = useState([...testDetails. answers]);
    // const [time, setTime] = useState(0);
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    
    const handleSaveAnswer = (id,ans) => {
        setAnswers((answers) => {
            const updatedAnswers = answers.map(ansItem => {
                if(ansItem.qid === id)
                {
                    return {...ansItem, text: ans};
                }
                return ansItem;
            })
            let currtime = myRef.current.getTime();
            const data = {
                answers: updatedAnswers,
                timeLeft: currtime
            }
            dispatch(updateAnswerSheet(testDetails._id, data));
            return updatedAnswers;
        });
        // const data = {
        //     answers,
        //     timeLeft: testDetails.timeLeft
        // }
        // dispatch(updateAnswerSheet(testDetails._id, data));
    }

    const handleFinalSubmit =() =>{
        console.log("final submit:",answers);
        const data = {
            answers: answers,
            timeLeft: 0
        }
        dispatch(updateAnswerSheet(testDetails._id, data));
        // let path = `/assessment/${testId}/submitted`;
        // history.push(path);

        console.log("Thank You");
        let displayMessage = "Thank You";
        let displaySubMessage = "Your responses are submitted";
        let path = `/assessment/${testId}/submitted`;
        // history.push(path);  
        return <Redirect to={{
            pathname: path,
            state: { displayMessage, displaySubMessage}
        }}  />
        
    }

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

    const updateFunc = () =>{
          
        let currtime = myRef.current.getTime();
        let ans = answers;
        let data = {
            answers: ans,
            timeLeft: currtime
        }
        dispatch(updateAnswerSheet(testDetails._id, data));
        console.log("update...",currtime,ans);
        
        
    }
    useEffect(() => {
        let clearId = setInterval(updateFunc,30000);
    
        return ()=> {
            clearInterval(clearId);
        };
    }, []); 

    if(message && message.variant === "error")
    {
        console.log("Something went wrong");
        let displayMessage = "Something went wrong";
        let displaySubMessage = "Your responses are saved. \nLogin again to resume the test";
        let path = `/assessment/${testId}/submitted`;
        return <Redirect to={{
            pathname: path,
            state: { error: true, displayMessage, displaySubMessage}
        }}  />
        
    }
    if(testDetails.timeLeft === 0)
    {
        console.log("You already attempted the test");
        let displayMessage = "You already attempted the test";
        let displaySubMessage = "Your responses are saved";
        let path = `/assessment/${testId}/submitted`;
        // history.push(path);  
        return <Redirect to={{
            pathname: path,
            state: { displayMessage, displaySubMessage}
        }}  />
    }

    
    
  return (
    <div className="analytics m-sm-30 ">
                <Container maxWidth="lg">
                {message && (<Message variant={message.variant} message={message.content}/>)}
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
                                {/* <div className="text-center text-24"
                                  style={{
                                    position:"fixed",
                                    left:"40vw",
                                    top:"10px",
                                    zIndex:"100"
                                  }}
                                >
                                <span className="font-bold">Time Left: </span> {time} minutes
                                </div> */}
                                <Timer timeLeft={testDetails.timeLeft}  ref={myRef}/>
                                {/* </Grid> */}

                                                          

                                </Grid>
                            </SimpleCard>
                        </Grid>
                    )}
                        <Grid item md={12} xs={12} sx={{ width: '75%' }}>
                            <SimpleCard elevation={3} className="h-full" title={"Question Paper"}>
                                <Grid item md={12} xs={12} className="text-right mb-2" style={{marginTop:"-35px"}}>
                                        <Button variant='outlined' color="primary" onClick={handleClickListItem}>
                                        Go to Question: {answers[selectedIndex].questionNumber}
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
                                            {answers.map((q, index) => (
                                                <MenuItem
                                                    key={q._id}                                                    
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                >
                                                   <span >Question: {q.questionNumber}</span> 
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Grid>
                                <Grid item md={12} xs={12} >
                                <QuestionAnswerForm 
                                    qid={testDetails.examId.questions[selectedIndex].qid} 
                                    text={testDetails.examId.questions[selectedIndex].text}
                                    answer={answers[selectedIndex].text}
                                    mark={testDetails.examId.questions[selectedIndex].mark}
                                    index={selectedIndex}
                                    setSelectedIndex={setSelectedIndex}
                                    numberOfQuestions={testDetails.examId.numberOfQuestions}
                                    saveAnswer={handleSaveAnswer}
                                    handleFinalSubmit={handleFinalSubmit}
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