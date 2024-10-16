import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useDispatch, useSelector } from 'react-redux';
import {createClass} from 'app/redux/actions/ClassActions';


export default function ClassFormDialog(props) {

    const {open, handleClose } = props
    const [state, setState] = useState({
        name:"",
        section:"",
        subject:"",
        description:""
    })

    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitted");
        // console.log(state);
        dispatch(createClass(state));
        handleClose();
        setState({
            name:"",
            section:"",
            subject:"",
            description:""
        })
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
            section:"",
            subject:"",
            description:""
        });
        
    }
    return (
        
            <Dialog
                open={open}
                onClose={handleBeforeClose}
                aria-labelledby="form-dialog-title"
                
            >
                <ValidatorForm onSubmit={handleSubmit} onError={() => null} style={{width:"600px"}}>
                <DialogTitle id="form-dialog-title">Create new class</DialogTitle>
                <DialogContent >
                    <DialogContentText >
                    {/* To subscribe to this website, please enter your email
                        address here. We will send updates occasionally. */}
                        Please enter the required details.
                    </DialogContentText>
                    
                            <TextValidator
                                className="mb-4 w-full"
                                label="Class name"
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
                                label="Section"
                                onChange={handleChange}
                                type="text"
                                name="section"
                                value={state.section || ''}    
                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="Subject"
                                onChange={handleChange}
                                type="text"
                                name="subject"
                                value={state.subject || ''}    
                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="Description"
                                onChange={handleChange}
                                type="text"
                                name="description"
                                value={state.description || ''}    
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
                        Create
                    </Button>
                </DialogActions>
                </ValidatorForm>
            </Dialog>
            
    )
}
