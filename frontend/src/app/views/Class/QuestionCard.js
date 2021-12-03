import React from 'react';
import {
    Icon,
    Grid,
    TextField,  
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core'
const QuestionCard = () => {
    return (
        <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
                <TextField className="mb-4 w-full"  id="test-Question" label="Question" variant="standard" />
            </Grid>
            <Grid item md={4} xs={12}>
                <InputLabel id="question-type">Type</InputLabel>
                <Select
                    labelId="question-type"
                    id="type"
                    // value={age}
                    // onChange={handleChange}
                    label="type"
                    className="mb-4 w-full"
                    >
                    
                    <MenuItem value={'text'}>Short answer</MenuItem>
                    <MenuItem value={'mcq'}>Multiple Choice</MenuItem>
                </Select>
            </Grid>
            <Grid item md={9} xs={12}>
                <TextField className="mb-4 w-full"  id="answer-key" label="Answer Key" variant="standard" />
            </Grid>
            <Grid item md={2} xs={12}>
                <TextField className="mb-4 ml-2 w-full"  id="points" label="Marks" variant="standard" />
            </Grid>
            <Grid item md={1} xs={12}>
                <Icon className="mt-6 ml-2 cursor-pointer" color="error" variant="contained" >delete</Icon> 
            </Grid>
        </Grid>
    )
}

export default QuestionCard;
