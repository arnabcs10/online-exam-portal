import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {getTestStatus} from 'app/redux/actions/TestActions';
import MatxLoading from 'app/components/MatxLoading/MatxLoading';
import {
    Grid,
    Container,
    Icon
} from '@material-ui/core';
import { SimpleCard } from 'app/components';
import TestWaitScreen from './TestWaitScreen';
import TestReadyScreen from './TestReadyScreen';
import TestEndedScreen from './TestEndedScreen';

const DefaultScreen = () =>{
    return (
        <div>
            Please Wait...
        </div>
    );
}


const StartScreen = () => {
    const dispatch = useDispatch();
    const { testId} = useParams();

    const testState = useSelector(state => state.testStore);
    const { loading, message, status, testDetails } = testState;

    let displayComponent = <DefaultScreen />

    switch (status) {
        case 0:
            displayComponent = <TestWaitScreen />
            break;
        case 1:
            displayComponent = <TestReadyScreen />
            break;
        case 2:
            displayComponent = <TestEndedScreen />
            break;
    
        default:
            displayComponent = <DefaultScreen />
            break;
    }
    
    useEffect(() => {        
        dispatch(getTestStatus(testId));
    }, [dispatch]);
    
    return (loading ? (<MatxLoading/>):(
            <>{displayComponent}</>
    ))
}

export default StartScreen;

{/* {message && (<Message variant={message.variant} message={message.content}/>)} */}