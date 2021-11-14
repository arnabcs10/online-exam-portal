import React from 'react'
import { Grid, Card, Icon, Fab } from '@material-ui/core'

const TestCard = (props) => {
    
    const { testList } = props;
    return (
        <div>
            <Grid container spacing={3}>
                <Grid key={'Create New Class'} item md={3} sm={6} xs={12}>
                        <Card 
                            elevation={3} 
                            className="p-4 flex-column items-center"
                            style={{cursor:"pointer"}}
                        >
                            <div>
                            <Fab
                                size="medium"
                                className="bg-light-green circle-44 box-shadow-none"
                            >
                                <Icon className="text-green">add_to_photos</Icon>
                            </Fab>
                            </div>
                            <div className="ml-4">
                                <p className="m-1 py-1 text-muted">Create New Test</p>
                            </div>
                        </Card>        
                </Grid>
                {testList.map((item, ind) => (
                    <Grid key={item.name} item md={3} sm={6} xs={12}>
                        <Card elevation={3} className="p-4" style={{cursor:"pointer"}}>
                            <div className="flex items-center">
                                <Fab
                                    size="medium"
                                    className="bg-light-green circle-44 box-shadow-none"
                                >
                                    <Icon className="text-green">{item.icon}</Icon>
                                </Fab>
                                <h5 className="font-medium text-green m-0 ml-3">
                                    {item.name}
                                </h5>
                            </div>
                            <div className="pt-4 flex items-center">
                                <div className="m-0 text-muted flex-grow">Date: { item.date}</div>
                                
                                <span className="text-13 text-green ml-1">marks: {item.marks}</span>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default TestCard