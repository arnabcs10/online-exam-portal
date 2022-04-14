import React from 'react';
import { useSelector } from 'react-redux';
import {
    Grid,
    Container,
    Icon,
    Fab
} from '@material-ui/core';
import { SimpleCard } from 'app/components';
import MatxLoading from 'app/components/MatxLoading/MatxLoading';

const SubmittedScreen = (props) =>{
    const { location } = props;
    const testState = useSelector(state => state.testStore);
    const { loading, message, status } = testState;

    const displayMessage = location.state ? location.state.displayMessage : "Thank You";

    return (loading ? (<MatxLoading/>):(
        <div className="analytics m-sm-30">
                <Container maxWidth="sm">
                    <Grid container spacing={2}>
                    
                        <Grid item md={12} xs={12} sx={{ width: '75%' }}>
                            <SimpleCard elevation={3} className="h-full" title={""}>
                                
                                <Grid container spacing={2} className="text-center">
                                    <Grid item md={12} xs={12} >                                 
                                        <Fab
                                            size="medium"
                                            className="bg-light-green circle-44 box-shadow-none"
                                        >
                                            <Icon className="text-muted">sentiment_satisfied</Icon>
                                        </Fab>    
                                    </Grid>
                                    <Grid item md={12} xs={12} >                                 
                                        <div className="font-light text-24">
                                            {displayMessage}
                                        </div>
                                        <div className="font-light text-13">
                                            Your responses are submitted
                                        </div>
                                    </Grid>
                                </Grid>
                            </SimpleCard>
                        </Grid>
                    </Grid>            
                </Container>            
            </div>
    ));
}

export default SubmittedScreen;