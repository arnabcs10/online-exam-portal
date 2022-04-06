import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {getTestStatus} from 'app/redux/actions/TestActions';

const defaultScreen = () =>{
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

    // let displayComponent
    
    useEffect(() => {        
        dispatch(getTestStatus(testId));
    }, [dispatch]);
    
    return (
        <div>
            StartScreen { testId}
            {status}
        </div>
    );
}

export default StartScreen;