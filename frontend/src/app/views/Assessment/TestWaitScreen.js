import React from 'react'
import {
    Grid,
    Container,
    Icon,
    Fab
} from '@material-ui/core';
import { SimpleCard } from 'app/components';

const TestWaitScreen = () =>{
    const message = "Test has not started yet";
    return (
        <div className="analytics m-sm-30">
                <Container maxWidth="sm">
                    <Grid container spacing={2}>
                    
                        <Grid item md={12} xs={12} sx={{ width: '75%' }}>
                            <SimpleCard elevation={3} className="h-full">
                                
                                <Grid container spacing={2} className="text-center">
                                    <Grid item md={12} xs={12} >  
                                        <Fab
                                            size="medium"
                                            className="bg-light-primary circle-44 box-shadow-none"
                                        >
                                            <Icon className="text-gray">info_outline</Icon>
                                        </Fab>                               
                                        {/* <Icon className=' text-32'>info_outline</Icon> */}
                                    </Grid>
                                    <Grid item md={12} xs={12} >                                 
                                        <div className="font-light text-24">
                                            {message}
                                        </div>
                                        <div className="font-light text-13">
                                            Please refresh the page 
                                        </div>
                                    </Grid>
                                </Grid>
                            </SimpleCard>
                        </Grid>
                    </Grid>            
                </Container>            
            </div>
    );
}

export default TestWaitScreen;