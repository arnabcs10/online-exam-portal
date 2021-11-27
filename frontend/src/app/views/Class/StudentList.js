import React from 'react';
import { useSelector } from 'react-redux';
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    Icon,
    TableRow,
} from '@material-ui/core';

const StudentList = () => {
    const classState = useSelector(state => state.classStore);
    const { loading, message, classDetails } = classState;
    const subscribarList = [
        {
            name: 'Arnab Sengupta',
            email: 'arnab10panda@gmail.com',
            rollNumber: '18UCS024',
        },
        {
            name: 'Bitanuka Deb',
            email: 'bitanuka@gmail.com',
            rollNumber: '18UCS021',
        },
        {
            name: 'Hrishav Chaudhuri',
            email: 'hrishav@gmail.com',
            rollNumber: '18UCS023',
        },
        {
            name: 'Arghya Sutradhar',
            email: 'arghya@gmail.com',
            rollNumber: '18UCS026',
        },
        {
            name: 'Abbcser cassegne',
            email: 'abhranil@gmail.com',
            rollNumber: '18UCS025',
        },
        {
            name: 'lucy brown',
            email: 'bitanuka@gmail.com',
            rollNumber: '18UCS025',
        },
        {
            name: 'lucy brown',
            email: 'bitanuka@gmail.com',
            rollNumber: '18UCS025',
        },
        {
            name: 'lucy brown',
            email: 'bitanuka@gmail.com',
            rollNumber: '18UCS025',
        },
    ]
    
    return (
        <div className="analytics m-sm-30">
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
    )
}

export default StudentList
