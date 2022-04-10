import React, {useState} from 'react';
import{
    Divider,
    Grid,
    Button
} from '@material-ui/core';
import { SimpleCard } from 'app/components';

const QuestionAnswerForm = (props) => {
    const [isSaved, setIsSaved] = useState(false);
    const { qid, text, answer, mark, index } = props;
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
                    <div className='text-small font-light'> Answer Key </div>
                    <p>
                        {answer}
                    </p>
                
                    
                </Grid>
                
                <Grid item md={12} xs={12} className="text-right align-middle" style={{marginTop:"-15px"}}>
                    <Divider  />
                    {/* You can put button or icon here to denote plagarism detection enabled */}
                    <Button color={isSaved ? "primary" : "secondary"} variant="contained" onClick={() => setIsSaved((state) => !state)} className="mt-3 mr-2">
                    {isSaved ? "Saved" : "Save and Next"}                              
                    </Button>
                </Grid>
            </Grid>
        </SimpleCard>
  )
}

export default QuestionAnswerForm