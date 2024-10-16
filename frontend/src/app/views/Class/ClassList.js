import React,{useState,useEffect} from 'react'
import useAuth from 'app/hooks/useAuth'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {listClasses} from 'app/redux/actions/ClassActions';
import ClassCard from './shared/ClassCard'
import ClassFormDialog from './ClassFormDialog'
import Message from './CustomSnackbar';

const ClassList = () => {
    const {
        isAuthenticated,
        // user
    } = useAuth()
    const dispatch = useDispatch();
    const classState = useSelector(state => state.classStore);
    const { loading, message, classList } = classState;
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
                <h3 className="m-0">Classes</h3>
            </div>
            {message && (<Message variant={message.variant} message={message.content}/>)}
            <ClassFormDialog open={open}  handleClose={handleClose}/>
            <ClassCard classList={classList} loading={loading}  handleClickOpen={handleClickOpen}/>

            
        </div>
    )
}

export default ClassList
