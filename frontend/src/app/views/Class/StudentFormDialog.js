import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useDispatch, useSelector } from 'react-redux';
import {addNewStudent} from 'app/redux/actions/ClassActions';


export default function StudentFormDialog(props) {

    const {open, handleClose, classId, handleSheetSubmit, inputExcel, handleSheetCancel, fileName } = props
    const [state, setState] = useState({
        name:"",
        email:"",
        rollNumber:"",
    })

    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitted");
        console.log(state);
        dispatch(addNewStudent(state,classId,false));
        handleClose();
        setState({
            name:"",
            email:"",
            rollNumber:"",
        });
        handleSheetCancel();
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }
    const handleBeforeClose = () =>{
        handleClose();
        setState({
            name:"",
            email:"",
            rollNumber:"",
        });
        handleSheetCancel();
    }
    return (
        
            <Dialog
                open={open}
                onClose={handleBeforeClose}
                aria-labelledby="form-dialog-title"
                
            >
                <ValidatorForm onSubmit={handleSubmit} onError={() => null} style={{width:"600px"}}>
                <DialogTitle id="form-dialog-title">Add new student</DialogTitle>
                <DialogContent >
                    <DialogContentText >
                    {/* To subscribe to this website, please enter your email
                        address here. We will send updates occasionally. */}
                        Please enter the required details.
                    </DialogContentText>
                    
                            <TextValidator
                                className="mb-4 w-full"
                                label="Name"
                                onChange={handleChange}
                                type="text"
                                name="name"
                                value={state.name || ''}
                                validators={[
                                    'required',
                                ]}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="Email"
                                onChange={handleChange}
                                type="email"
                                name="email"
                                value={state.email || ''}  
                                validators={['required', 'isEmail']}
                                errorMessages={[
                                    'this field is required',
                                    'email is not valid',
                                ]}  
                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="Roll Number"
                                onChange={handleChange}
                                type="text"
                                name="rollNumber"
                                value={state.rollNumber || ''}    
                            />
                            
                    
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleBeforeClose}
                    >
                        Cancel
                    </Button>
                    <Button type="submit"  variant="contained" color="primary">
                        Add
                    </Button>
                </DialogActions>
                </ValidatorForm>
                    <DialogTitle id="form-dialog-title2">Or Select a Spreadsheet</DialogTitle>
                    <DialogContent >
                        <DialogContentText >
                            Make sure you have the first row with column names as "id","name" and "email"
                        </DialogContentText>
                        <div className="text-muted text-small pb-1 inline-block">file: {fileName}</div>
                        <div className="flex justify-center my-7">
                            
                            <Button component="label" color="primary" variant="outlined"> <Icon>file_upload</Icon> <input hidden type="file" id="input-excel" accept=".xls,.xlsx" onChange = {inputExcel} color="primary" variant="contained" /></Button>
                            <Button className="mx-4" onClick={handleSheetSubmit}  variant="contained" color="primary">
                                Submit
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleSheetCancel}
                            >
                                Cancel
                            </Button>
                        </div>    
                    </DialogContent >
            </Dialog>
            
    )
}
