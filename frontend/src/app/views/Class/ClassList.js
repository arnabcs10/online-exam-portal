import React,{useState} from 'react'
import useAuth from 'app/hooks/useAuth'
import { Link } from 'react-router-dom'
import {
    Card,
    TextField,
    MenuItem,
    IconButton,
    Icon,
    Grid,
} from '@material-ui/core'
import ClassCard from './shared/ClassCard'
import ClassFormDialog from './ClassFormDialog'
import StatCard2 from './shared/StatCards2'
import ComparisonChart2 from './shared/ComparisonChart2'
import StatCard4 from './shared/StatCard4'
import GaugeProgressCard from './shared/GuageProgressCard'
import FollowerCard from './shared/FollowerCard'
import FollowerCard2 from './shared/FollowerCard2'

const ClassList = () => {
    const {
        isAuthenticated,
        // user
    } = useAuth()
    const classList = [
        {
            icon: 'school',
            name: 'Class 1',
            subject: 'Operating System',
            section: 'A',
        },
        {
            icon: 'school',
            name: 'Class 2',
            subject: 'Database Management System',
            section: 'A',
        },
        {
            icon: 'school',
            name: 'Class 3',
            subject: 'OOPs',
            section: 'A',
        },
        {
            icon: 'school',
            name: 'Class 4',
            subject: 'Computer Networks',
            section: 'A',
        },
        {
            icon: 'school',
            name: 'Class 5',
            subject: 'Algorithms',
            section: 'A',
        },
        
    ]

    const [open, setOpen] = useState(false)

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }
    return (
        <div className="analytics m-sm-30">
            <div className="flex justify-between items-center items-center mb-6">
                <h3 className="m-0">Class List</h3>
            </div>
            <ClassFormDialog open={open}  handleClose={handleClose}/>
            <ClassCard classList={classList} handleClickOpen={handleClickOpen}/>

            
        </div>
    )
}

export default ClassList
