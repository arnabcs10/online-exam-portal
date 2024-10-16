import React, {useState,useEffect} from 'react';
import { v4 as uuid } from 'uuid';
import{
    Divider,
    Grid,
    Button,
    TextField,
    Radio,
    Checkbox
} from '@material-ui/core';
import { SimpleCard } from 'app/components';

const QuestionAnswerForm = (props) => {
    const { qid, text, answer, mark, index, qtype, options, setSelectedIndex, numberOfQuestions, saveAnswer, handleFinalSubmit } = props;

    // Initialize thses 2 states with values already saved in AnswerSheet DB
    const [isSaved, setIsSaved] = useState(false);
    const [optionsArray, setOptionsArray] = useState([]);
    const [value,setValue] = useState(answer); 
    const handleChange = (evt) => {
        setIsSaved(false);
        setValue(evt.target.value);
    }

    const handleAnswerSave = () => {
        // setIsSaved(true);

        if(qtype === 'mcq')
        {
            let mcqAns = "";
            optionsArray.forEach((op, index) => {                
                if(op.isSelected){
                    mcqAns += index;
                }
            });
            
            saveAnswer(qid,mcqAns);
            setIsSaved(true);
        }else{
            saveAnswer(qid,value);
            setIsSaved(true);
        }
        
    }
    const moveToNext = () => {
        setSelectedIndex(index+1);
    }

    const handleSubmit = () =>{
        handleFinalSubmit();
    }

    // handling options
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
    useEffect(() => {
        setValue(answer);
        setOptionsArray(st => (
            options.map((op,index) => {
                let optionSelected = false;
                if(qtype === 'mcq'){
                    let ansSet = answer.split('');
                    optionSelected = Boolean(ansSet.find(t => t === `${index}` ));
                }
                return {
                    id: uuid(),
                    optionText: op,
                    isSelected: optionSelected
                }
            }) 
        ))
        // if()
        setIsSaved((answer.length >= 1)); // set acc to props not hardcode
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
                        {qtype === 'mcq' ? (
                             <>
                             You can select any single or multiple options:
                             {optionsArray.map((op) =>{
                                //  let ansSet = answer.split('');
                                //  let isSelected = ansSet.find(t => t === `${index}` );
                                 return (
                                 <div key={op.id} className="flex">
                                     <Checkbox                                     
                                     checked={op.isSelected}
                                     onChange={() => handleSelectOption(op.id)}                                              
                                     color="primary"                                            
                                     />
                                     {/* {index > 1 ?(<Checkbox                                     
                                     checked={op.isSelected}
                                     onChange={() => handleSelectOption(op.id)}                                              
                                     color="primary"                                            
                                     />)
                                     :
                                     (<Checkbox                                        
                                        checked={op.isSelected}
                                        onChange={() => handleSelectOption(op.id)}                                             
                                        color="primary" 
                                    />)} */}
                                     <p>{op.optionText}</p>
                                     
                                 </div>
                             )})}
                               
                             </>
                        ) : 
                        (
                        <TextField 
                            value={value} 
                            onChange={handleChange} 
                            margin='normal'
                            multiline={true}
                            fullWidth
                        />
                        )}
                        
                
                    
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