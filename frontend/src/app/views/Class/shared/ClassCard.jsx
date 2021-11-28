import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, IconButton, Icon, Fab } from '@material-ui/core'
import MatxLoading from 'app/components/MatxLoading/MatxLoading';
import {getClassDetails} from 'app/redux/actions/ClassActions';


const ClassCard = (props) => {
    const dispatch = useDispatch();
    

    const handleClick =(id) =>{
        // dispatch(getClassDetails(id));
    }

    const { classList, handleClickOpen, loading } = props;
    return (
        <div>
            <Grid container spacing={3}>
                <Grid key={'Create New Class'} item md={3} sm={6} xs={12}>
                        <Card 
                            elevation={3} 
                            className="p-4 flex-column items-center"
                            onClick={handleClickOpen}
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
                                <p className="m-1 py-1 text-muted">{'Create New Class'}</p>
                            </div>
                        </Card>        
                </Grid>
                {loading ? (<MatxLoading/>) :  (
                      <>
                        {classList.map((item, ind) => (
                            <Grid key={item._id} item md={3} sm={6} xs={12}>
                                <Link to={`/class/${item._id}`}>
                                <Card elevation={3} className="p-4" onClick={() => handleClick(item._id)}>
                                    <div className="flex items-center">
                                        <Fab
                                            size="medium"
                                            className="bg-light-green circle-44 box-shadow-none"
                                        >
                                            <Icon className="text-green">school</Icon>
                                        </Fab>
                                        <h5 className="font-medium text-green m-0 ml-3">
                                            {item.name}
                                        </h5>
                                    </div>
                                    <div className="pt-4 flex items-center">
                                        <h4 className="m-0 text-muted flex-grow">{item.subject.length > 16 ? `${item.subject.slice(0, 15)}..` : item.subject}</h4>
                                        
                                        <span className="text-13 text-green ml-1">section: {item.section}</span>
                                    </div>
                                </Card>
                                </Link>
                            </Grid>
                        ))}
                        </>  
                )}
                
            </Grid>
        </div>
    )
}

export default ClassCard
