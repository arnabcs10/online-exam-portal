import React from 'react'
import { Grid, Card, IconButton, Icon, Fab } from '@material-ui/core'

const StatCard3 = () => {
    const statList = [
        {
            icon: 'school',
            name: 'Class 1',
            subject: 'Computer Science',
            section: 'A',
        },
        {
            icon: 'school',
            name: 'Class 1',
            subject: 'Computer Science',
            section: 'A',
        },
        {
            icon: 'school',
            name: 'Class 1',
            subject: 'Computer Science',
            section: 'A',
        },
        {
            icon: 'school',
            name: 'Class 1',
            subject: 'Computer Science',
            section: 'A',
        },
        {
            icon: 'school',
            name: 'Class 1',
            subject: 'Computer Science',
            section: 'A',
        },
        
    ]

    return (
        <div>
            <Grid container spacing={3}>
                <Grid key={'Create New Class'} item md={3} sm={6} xs={12}>
                        <Card elevation={3} className="p-4 flex-column items-center">
                            <div>
                            <Fab
                                size="medium"
                                className="bg-light-green circle-44 box-shadow-none"
                            >
                                <Icon className="text-green">add_to_photos</Icon>
                            </Fab>
                            </div>
                            <div className="ml-4">
                                <p className="m-1 py-1 text-muted">{'Create New Class'}</p>
                            </div>
                        </Card>        
                </Grid>
                {statList.map((item, ind) => (
                    <Grid key={item.name} item md={3} sm={6} xs={12}>
                        <Card elevation={3} className="p-4">
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
                                <h4 className="m-0 text-muted flex-grow">{item.subject}</h4>
                                
                                <span className="text-13 text-green ml-1">section: {item.section}</span>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default StatCard3
