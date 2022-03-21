import React,{useState, useEffect} from 'react'
import useAuth from 'app/hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux';
import {listExams} from 'app/redux/actions/ExamActions';
import { Link } from 'react-router-dom'
import TestCard from './TestCard'
import Message from './CustomSnackbar';

const TestList = () => {
    const classState = useSelector(state => state.classStore);
    const { classDetails } = classState;
    const {
        isAuthenticated,
        // user
    } = useAuth()
    const dispatch = useDispatch();
    const examState = useSelector(state => state.examStore);
    const { loading, message, examList } = examState;
    useEffect(() => {
        dispatch(listExams(classDetails._id));
    }, [dispatch]);
    const testList = [
        {
            icon: 'assignment',
            name: 'Test 1',
            date: '14/11/2021',
            marks: 100,
        },
        {
            icon: 'assignment',
            name: 'Test 2',
            date: '14/11/2021',
            marks: 100,
        },
        {
            icon: 'assignment',
            name: 'Test 3',
            date: '14/11/2021',
            marks: 100,
        },
        {
            icon: 'assignment',
            name: 'Test 4',
            date: '14/11/2021',
            marks: 100,
        },
        {
            icon: 'assignment',
            name: 'Test 5',
            date: '14/11/2021',
            marks: 100,
        },
        
    ]

    
    return (
        <div className="analytics m-sm-30">
            <div className="flex justify-between items-center items-center mb-6">
                <h3 className="m-0">Tests</h3>
            </div>
            {message && (<Message variant={message.variant} message={message.content}/>)}
            <TestCard testList={examList} loading={loading} classId={classDetails._id} />

            
        </div>
    )
}

export default TestList
