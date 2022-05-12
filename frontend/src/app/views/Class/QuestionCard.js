import React, {useState} from 'react';
import { v4 as uuid } from 'uuid';
import {
    Icon,
    Button,
    Grid,
    TextField,  
    InputLabel,
    Select,
    MenuItem,
    Divider,
    Checkbox
} from '@material-ui/core'
const QuestionCard = (props) => {
    const { qid, deleteQuestion, updateAndSaveQuestion } = props;
    const [isSaved, setIsSaved] = useState(props.text.length > 0 ? true : false);
    const [optionsArray, setOptionsArray] = useState([{
        id: uuid(),
        optionText: "",
        isSelected: false
    }
]);
    const [type, setType] = useState('sa');
    const [state, setState] = useState({
        text:props.text || '',
        answer:props.answer || '',
        mark: props.mark || '',
        qtype:'sa',
        options:[]
    });
    
    const handleSelectOption = (opId) => {
        setIsSaved(false);
        setOptionsArray(options => {
            const newOptions = options.map(op => {
                if(op.id === opId){
                    return {...op, isSelected: !op.isSelected}
                }
                return op;
            });

            return newOptions;
        })
    }
    const handleOptionTextChange = (opId, text) => {
        // console.log(event.target.value);
        setIsSaved(false);
        setOptionsArray(options => {
            const newOptions = options.map(op => {
                if(op.id === opId){
                    return {...op, optionText: text}
                }
                return op;
            });

            return newOptions;
        })
    }
    const addOption = () => {
        setIsSaved(false);
        setOptionsArray(options => {
            
            return [
                ...options,
                {
                    id: uuid(),
                    optionText: "",
                    isSelected: false
                }
            ];
        });
    }
    const deleteOption = (opId) =>{
        setIsSaved(false);
        setOptionsArray(options => {
            const newOptions = options.filter((op) => op.id !== opId);

            return newOptions;
        })
    }
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
        const finalOptions = [];
        let mcqAns = state.answer;
        if(type === 'mcq')
        {
            mcqAns = "";
            optionsArray.forEach((op, index) => {
                finalOptions.push(op.optionText);
                if(op.isSelected){
                    mcqAns += index;
                }
            });
        }
        updateAndSaveQuestion({
            text:state.text ,
            answer: mcqAns ,
            mark: state.mark ,
            qtype: type,
            options: finalOptions,
            qid
            
        });
        console.log({
            text:state.text ,
            answer: mcqAns ,
            mark: state.mark ,
            qtype: type,
            options: finalOptions,
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
        setIsSaved(false);
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
                {type === 'mcq' ? (
                <>
                {optionsArray.map((op,index) =>(
                    <div key={op.id} className="flex">
                        <Checkbox
                        checked={op.isSelected}
                        onChange={() => handleSelectOption(op.id)}                                            
                        color="primary"                                            
                        />
                        <TextField
                            id={op.id}
                            className="mb-4 w-full"
                            variant="standard"
                            label={`option-${index+1}`}
                            onChange={(event) => handleOptionTextChange(op.id,event.target.value)}                  
                            multiline
                            name={`option-${index+1}`}
                            value={op.optionText || ''}
                        />
                        <Icon className="mt-6 ml-2 cursor-pointer" color="error" variant="contained" onClick={() => deleteOption(op.id)}>delete</Icon> 
                    </div>
                ))}
                  <Button color="primary" onClick={addOption}>
                        <Icon>
                            add
                        </Icon>
                        Add option
                    </Button>  
                </>) 
                :
                (<TextField
                    id="answer-key"
                    className="mb-4 w-full"
                    variant="standard"
                    label="Answer Key"
                    onChange={handleChange}                  
                    multiline
                    name="answer"
                    value={state.answer || ''}
                />) } 
                
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
