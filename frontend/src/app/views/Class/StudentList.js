import React,{ useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    Icon,
    TableRow,
    Button,
} from '@material-ui/core';
import StudentFormDialog from './StudentFormDialog';

const StudentList = () => {
    const classState = useSelector(state => state.classStore);
    const { loading, message, classDetails } = classState;
    const [open, setOpen] = useState(false)

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }
    
    return (
        <>
        <StudentFormDialog open={open}  handleClose={handleClose} classId={classDetails._id}/>
        <div className="analytics m-sm-30">
            <div className="flex justify-between items-center items-center mb-6">
                <h3 className="m-0">Add New Students</h3>
                
            </div>
            <Button color="primary" variant="contained" onClick={handleClickOpen}>Click</Button>
            <div className="flex justify-between items-center items-center mb-6">
                <h3 className="m-0">Students</h3>
            </div>
                <div className="w-full overflow-auto">
                    <Table className="whitespace-pre">
                        <TableHead>
                            <TableRow>
                                <TableCell className="px-0">Name</TableCell>
                                <TableCell className="px-0">Roll Number</TableCell>
                                <TableCell className="px-0">Email</TableCell>    
                                <TableCell className="px-0">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {classDetails.studentsEnrolled.map((student) => (
                                <TableRow key={student._id}>
                                    <TableCell className="px-0" align="left">
                                        {student.name}
                                    </TableCell>
                                    <TableCell className="px-0" align="left">
                                        {student.rollNumber}
                                    </TableCell>
                                    <TableCell className="px-0" align="left">
                                        {student.email}
                                    </TableCell>                                    
                                    <TableCell className="px-0">
                                        <IconButton>
                                            <Icon color="error">close</Icon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            
        </div>
        </>
    )
}

export default StudentList
