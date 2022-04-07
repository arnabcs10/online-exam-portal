import React from 'react'
import {
    Grid,
    Container,
    Icon
} from '@material-ui/core';
import { SimpleCard } from 'app/components';

const TestReadyScreen = () =>{
    const message = "Test alreay";
    return (
        <div className="analytics m-sm-30">
                <Container maxWidth="sm">
                    <Grid container spacing={2}>
                    
                        <Grid item md={12} xs={12} sx={{ width: '75%' }}>
                            <SimpleCard elevation={3} className="h-full" title={""}>
                                
                                <Grid container spacing={2}>
                                    <Grid item md={12} xs={12} >                                 
                                        <Icon className=' '>event</Icon>
                                    </Grid>
                                    <Grid item md={12} xs={12} >                                 
                                        <div className="font-bold">
                                            {message}
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

export default TestReadyScreen;