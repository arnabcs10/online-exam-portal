import React, {useState,useEffect} from 'react';
import{
    Divider,
    Grid,
    Button,
    TextField
} from '@material-ui/core';
import { SimpleCard } from 'app/components';

const QuestionAnswerForm = (props) => {
    const { qid, text, answer, mark, index, setSelectedIndex, numberOfQuestions, saveAnswer, handleFinalSubmit } = props;

    // Initialize thses 2 states with values already saved in AnswerSheet DB
    const [isSaved, setIsSaved] = useState(false);
    const [value,setValue] = useState(answer); 
    const handleChange = (evt) => {
        setIsSaved(false);
        setValue(evt.target.value);
    }

    const handleAnswerSave = () => {
        saveAnswer(qid,value);
        setIsSaved(true);
    }
    const moveToNext = () => {
        setSelectedIndex(index+1);
    }

    const handleSubmit = () =>{
        handleFinalSubmit();
    }
    useEffect(() => {
        setValue(answer);
        // if()
        setIsSaved((answer.length > 1)); // set acc to props not hardcode
    }, [props])
    
  return (
        <SimpleCard elevation={3} className="h-full" title={`Question: ${index+1}`}>
            <Grid container spacing={2}>
                <Grid item md={10} xs={12}>
                    <div className='text-small font-light'> Question </div>
                    <p>
                        {text}
                    </p>
                    <Divider  />
                </Grid>
                <Grid item md={2} xs={12}>
                <div className='text-small font-light'> Marks </div>
                    <p>
                        {mark}
                    </p>
                    <Divider  />
                </Grid>
                <Grid item md={12} xs={12}>                
                    <div className='text-small font-light'> Answer  </div>
                        <TextField 
                            value={value} 
                            onChange={handleChange} 
                            margin='normal'
                            multiline={true}
                            fullWidth
                        />
                
                    
                </Grid>
                
                <Grid item md={12} xs={12} className="text-right align-middle" style={{marginTop:"-15px"}}>
                    <Divider  />
                    {/* You can put button or icon here to denote plagarism detection enabled */}
                    <Button color={isSaved ? "primary" : "secondary"} variant="contained" onClick={handleAnswerSave} className="mt-3 mr-2">
                    {isSaved ? "Saved" : "Save"}                              
                    </Button>
                    {index === numberOfQuestions-1 ?(<Button  variant="contained" onClick={handleSubmit} className="mt-3 mr-2 bg-green font-bold text-white">
                            End Test                                
                        </Button>):
                        (<Button color="default" variant="contained" onClick={moveToNext} className="mt-3 mr-2">
                            Next                      
                        </Button>)
                    }
                </Grid>
            </Grid>
        </SimpleCard>
  )
}

export default QuestionAnswerForm