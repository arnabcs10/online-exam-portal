import React from 'react'
import useAuth from 'app/hooks/useAuth'
import { Link } from 'react-router-dom'
import {
    Card,
    IconButton,
    Icon,
    Fab,
    Grid,
    CardMedia
} from '@material-ui/core'


const ClassPage = () => {
    const {
        isAuthenticated,
        // user
    } = useAuth()
    return (
        <div className="analytics m-sm-30">
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                    <Card className="mt-1 mb-6" elevation={3}>
                        <CardMedia
                            component="img"
                            height="240"
                            image="https://gstatic.com/classroom/themes/img_backtoschool.jpg"
                            alt="class background"
                        />
                    </Card>
                </Grid>
                <Grid item md={4} xs={12}>
                        <Card elevation={3} className="p-5 mb-3 flex" style={{cursor:"pointer"}}>
                            <div>
                                <Fab
                                    size="medium"
                                    className="bg-light-green circle-44 box-shadow-none"
                                >
                                    <Icon className="text-green">group</Icon>
                                </Fab>
                            </div>
                            <div className="ml-4">
                                <h3 className="mt-1 text-22 font-light">
                                    View All Students
                                </h3>
                                <p className="m-0 text-muted">Click Here</p>
                            </div>
                        </Card>
                        <Card elevation={3} className="p-5 flex" style={{cursor:"pointer"}}>
                            <div>
                                <Fab
                                    size="medium"
                                    className="bg-light-green circle-44 box-shadow-none"
                                >
                                    <Icon className="text-green">assignment</Icon>
                                </Fab>
                            </div>
                            <div className="ml-4">
                                <h3 className="mt-1 text-22 font-light">
                                    View All Test
                                </h3>
                                <p className="m-0 text-muted">Click Here</p>
                            </div>
                        </Card>
                    {/* <FollowerCard2 /> */}
                </Grid>
                <Grid item md={8} xs={12}>
                    <Card elevation={3} className="h-full">
                        <div className=" px-4 py-3 mb-6 flex justify-between items-center bg-light-gray">
                            <span className="font-medium text-muted">Class details</span>
                            <IconButton size="small">
                                <Icon>more_horiz</Icon>
                            </IconButton>
                        </div>
                        
                        <h5 className="text-center font-medium mb-2">Name</h5>
                        <p className="m-0 text-muted text-center">
                            Subject Computer Science
                        </p>
                    </Card>
                </Grid>
            </Grid>

            
        </div>
    )
}

export default ClassPage
