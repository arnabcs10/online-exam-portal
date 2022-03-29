import React, {useState} from 'react';
import{
    Divider,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { SimpleCard } from 'app/components';

const QuestionCard = (props) => {
    const { qid, text, answer, mark } = props;
    

    
    
    return (
        <Grid container spacing={2}>
            <Grid item md={10} xs={12}>
                <div className='text-small font-light'> Question </div>
                <p>
                    {text}
                </p>
                <Divider  />
            </Grid>
            <Grid item md={2} xs={12}>
                <div className='text-small font-light'> Type </div>
                <p>
                    Short Answer
                </p>
                <Divider  />
            </Grid>
            <Grid item md={10} xs={12}>                
                <div className='text-small font-light'> Answer Key </div>
                <p>
                    {answer}
                </p>
               
                
            </Grid>
            <Grid item md={2} xs={12}>                
                <div className='text-small font-light'> Marks </div>
                <p>
                    {mark}
                </p>
                <Divider  />
                
            </Grid>
            <Grid item md={12} xs={12} className="text-right align-middle" style={{marginTop:"-15px"}}>
                <Divider  />
                {/* You can put button or icon here to denote plagarism detection enabled */}
                
            </Grid>
        </Grid>
    )
}

const TestPaperPanel = (props) => {
    const { questions, name } = props;
  return (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography className="">
                {name}
            </Typography>
        </AccordionSummary>
        <div style={{backgroundColor :"#e0e0e0"}}>
            {questions && questions.map((que,index) => (
                <AccordionDetails key={que.qid}>
                <Grid item md={12} xs={12} >
                    <SimpleCard elevation={3} className="h-full" title={`Question: ${index+1}`}>  
                        
                        <QuestionCard 
                            qid={que.qid} 
                            text={que.text}
                            answer={que.answer}
                            mark={que.mark}
                           
                        />
                                                
                    </SimpleCard>                  
                </Grid>
                </AccordionDetails>
            ))}
        </div>
    </Accordion>
  )
}

export default TestPaperPanel;