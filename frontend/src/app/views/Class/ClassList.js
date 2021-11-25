import React,{useState,useEffect} from 'react'
import useAuth from 'app/hooks/useAuth'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {listClasses} from 'app/redux/actions/ClassActions';
import ClassCard from './shared/ClassCard'
import ClassFormDialog from './ClassFormDialog'


const ClassList = () => {
    const {
        isAuthenticated,
        // user
    } = useAuth()
    const dispatch = useDispatch();
    const classList = useSelector(state => state.classList);
    const { loading, error, classes } = classList;
    useEffect(() => {
        dispatch(listClasses());
    }, [dispatch]);
    // const classList = [
    //     {
    //         icon: 'school',
    //         name: 'Class 1',
    //         subject: 'Operating System',
    //         section: 'A',
    //     },
    //     {
    //         icon: 'school',
    //         name: 'Class 2',
    //         subject: 'Database Management System',
    //         section: 'A',
    //     },
    //     {
    //         icon: 'school',
    //         name: 'Class 3',
    //         subject: 'OOPs',
    //         section: 'A',
    //     },
    //     {
    //         icon: 'school',
    //         name: 'Class 4',
    //         subject: 'Computer Networks',
    //         section: 'A',
    //     },
    //     {
    //         icon: 'school',
    //         name: 'Class 5',
    //         subject: 'Algorithms',
    //         section: 'A',
    //     },
        
    // ]

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
            <ClassCard classList={classes} loading={loading} error={error} handleClickOpen={handleClickOpen}/>

            
        </div>
    )
}

export default ClassList
