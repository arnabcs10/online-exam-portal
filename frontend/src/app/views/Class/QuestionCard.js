import React, {useState} from 'react';
import {
    Icon,
    Button,
    Grid,
    TextField,  
    InputLabel,
    Select,
    MenuItem,
    Divider
} from '@material-ui/core'
const QuestionCard = (props) => {
    const { qid, deleteQuestion, updateAndSaveQuestion } = props;
    const [isSaved, setIsSaved] = useState(props.text.length > 0 ? true : false);
    const [type, setType] = useState('sa');
    const [state, setState] = useState({
        text:props.text || '',
        answer:props.answer || '',
        mark: props.mark || 0,
    });

    const handleChange = (event) => {
        event.persist()
        let val = event.target.value;
        if(event.target.name === 'mark')
        {
            val = Number(val);
        }
        setState({
            ...state,
            [event.target.name]: val,
        })
        if(isSaved ){
            setIsSaved(false);
        }
        
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("saved");
        setIsSaved(true);
        updateAndSaveQuestion({
            ...state,
            qid
        });
        console.log({
            ...state,
            qid
        });  
        
    }
    const handleDelete = () => {
        deleteQuestion({
            ...state,
            qid
        });
    }
    const handleTypeChange = (event) => {
        setType(event.target.value);
      };
    return (
        <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
                <TextField 
                    className="mb-4 w-full"  
                    id="test-Question" 
                    label="Question" 
                    variant="standard" 
                    onChange={handleChange} 
                    multiline
                    name="text"
                    value={state.text || ''}
                />
                
            </Grid>
            <Grid item md={4} xs={12}>
                <InputLabel id="question-type">Type</InputLabel>
                <Select
                    labelId="question-type"
                    id="type"
                    value={type}
                    onChange={handleTypeChange}
                    label="type"
                    className="mb-4 w-full"
                    >
                    
                    <MenuItem value={'sa'}>Short answer</MenuItem>
                    <MenuItem value={'mcq'}>Multiple Choice</MenuItem>
                </Select>
            </Grid>
            <Grid item md={9} xs={12}>                
                <TextField
                    id="answer-key"
                    className="mb-4 w-full"
                    variant="standard"
                    label="Answer Key"
                    onChange={handleChange}                  
                    multiline
                    name="answer"
                    value={state.answer || ''}
                />  
                
            </Grid>
            <Grid item md={3} xs={12}>                
                <TextField
                    id="points" 
                    label="Marks"
                    className="mb-4 w-full"
                    variant="standard"
                    onChange={handleChange}
                    type="number"                                        
                    name="mark"
                    value={state.mark}
                />
                
            </Grid>
            <Grid item md={12} xs={12} className="text-right align-middle" style={{marginTop:"-15px"}}>
                <Divider  />
                <Button color={isSaved ? "primary" : "default"} variant="contained" onClick={handleSubmit} className="mb-3 mr-2">
                    {isSaved ? "Saved" : "Save"}                              
                </Button>
                <Icon className="mt-6 ml-2 cursor-pointer" color="error" variant="contained" onClick={handleDelete}>delete</Icon> 
            </Grid>
        </Grid>
    )
}

export default QuestionCard;
