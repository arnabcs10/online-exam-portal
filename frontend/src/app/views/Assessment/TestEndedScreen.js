import React from 'react'
import {
    Grid,
    Container,
    Icon,
    Fab
} from '@material-ui/core';
import { SimpleCard } from 'app/components';

const TestEndedScreen = () =>{
    const message = "Test alreay ended";
    return (
        <div className="analytics m-sm-30">
                <Container maxWidth="sm">
                    <Grid container spacing={2}>
                    
                        <Grid item md={12} xs={12} sx={{ width: '75%' }}>
                            <SimpleCard elevation={3} className="h-full" title={""}>
                                
                                <Grid container spacing={2} className="text-center">
                                    <Grid item md={12} xs={12} >                                 
                                        <Fab
                                            size="medium"
                                            className="bg-light-error circle-44 box-shadow-none"
                                        >
                                            <Icon className="text-muted">sentiment_dissatisfied</Icon>
                                        </Fab>    
                                    </Grid>
                                    <Grid item md={12} xs={12} >                                 
                                        <div className="font-light text-24">
                                            {message}
                                        </div>
                                        <div className="font-light text-13">
                                            Please contact your Admin
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

export default TestEndedScreen;