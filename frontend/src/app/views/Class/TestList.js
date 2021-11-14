import React,{useState} from 'react'
import useAuth from 'app/hooks/useAuth'
import { Link } from 'react-router-dom'
import TestCard from './TestCard'


const TestList = () => {
    const {
        isAuthenticated,
        // user
    } = useAuth()
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
            <TestCard testList={testList} />

            
        </div>
    )
}

export default TestList
