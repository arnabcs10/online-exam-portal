import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import xlsx from 'xlsx';
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
import {addNewStudent} from 'app/redux/actions/ClassActions';


const StudentList = () => {
    const dispatch = useDispatch();
    const classState = useSelector(state => state.classStore);
    const { loading, message, classDetails } = classState;
    const [open, setOpen] = useState(false)
    const [studentsArray, setStudentsArray] = useState([]);

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }
    const handleSubmit = ()=>{
        dispatch(addNewStudent(studentsArray,classDetails._id,true));
        console.log(studentsArray);
    }
    const inputExcel = (event) =>{
        console.log(event.target.files[0]);
        if(!event.target.files[0])
            return;
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(event.target.files[0]);
        fileReader.onload = (event)=>{
            let data = event.target.result;
            let workbook = xlsx.read(data,{type:"binary"});
            workbook.SheetNames.forEach(sheet => {
                let rowObject = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);

                console.log(rowObject);
                if(!rowObject[0].id && !rowObject[0].name && !rowObject[0].email){
                    console.log("invalid file format");
                    return;
                }

                const arrayStudents = [];
                rowObject.forEach(element => {
                    const obj = {
                        name: element.name,
                        email: element.email,
                        rollNumber: element.id
                    }
                    arrayStudents.push(obj);
                })
                setStudentsArray(st => [...st,...arrayStudents]);
            });
        }
    }
    return (
        <>
        <StudentFormDialog open={open}  handleClose={handleClose} classId={classDetails._id}/>
        <div className="analytics m-sm-30">
            <div className="flex justify-between items-center items-center mb-6">
                <h3 className="m-0">Add New Students</h3>
                
            </div>
            <Button color="primary" variant="contained" onClick={handleClickOpen}>Click</Button>
            <Button color="primary" variant="contained" onClick={handleSubmit}>Submit</Button>
            <Button component="label" color="primary" variant="outlined"> <Icon>publish</Icon> <input hidden type="file" id="input-excel" accept=".xls,.xlsx" onChange = {inputExcel} color="primary" variant="contained" /></Button>
            
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
