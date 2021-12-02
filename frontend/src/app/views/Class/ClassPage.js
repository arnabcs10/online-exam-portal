import React,{useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {
    Card,
    IconButton,
    Icon,
    Fab,
    Grid,
    CardMedia,
    Table,
    TableCell,
    TableBody,
    TableRow
} from '@material-ui/core';
import MatxLoading from 'app/components/MatxLoading/MatxLoading';
import {getClassDetails} from 'app/redux/actions/ClassActions';

const ClassPage = () => {
    const dispatch = useDispatch();
    const {classId} = useParams();
    useEffect(() => {
        dispatch(getClassDetails(classId));
    }, [dispatch,classId]);
    
  
    const classState = useSelector(state => state.classStore);
    const { loading, message, classDetails } = classState;
    return (
        <div className="analytics m-sm-30">
            {loading && (<MatxLoading/>)}
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
                    <Link to={`/class/${classDetails._id}/student`}>
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
                    </Link>

                    <Link to={`/class/${classDetails._id}/test`}>
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
                                    View All Tests
                                </h3>
                                <p className="m-0 text-muted">Click Here</p>
                            </div>
                        </Card>
                    </Link>
                    
                </Grid>
                <Grid item md={8} xs={12}>
                    <Card elevation={3} className="h-full">
                        <div className=" px-4   flex justify-between items-center bg-light-gray">
                            <span className="font-medium text-muted">Class details</span>
                            
                        </div>
                        
                        <div className="w-full overflow-auto px-4 ">
                            <Table className="whitespace-pre">                    
                                <TableBody>
                                   
                                        <TableRow key="name">
                                            <TableCell className="px-0" align="left">
                                                Name:
                                            </TableCell>
                                            <TableCell className="px-0" align="left">
                                               {classDetails.name}
                                            </TableCell>                                
                                        </TableRow>
                                        <TableRow key="section">
                                            <TableCell className="px-0" align="left">
                                                Section:
                                            </TableCell>
                                            <TableCell className="px-0" align="left">
                                               {classDetails.section}
                                            </TableCell>                                
                                        </TableRow>
                                        <TableRow key="subject">
                                            <TableCell className="px-0" align="left">
                                                Subject:
                                            </TableCell>
                                            <TableCell className="px-0" align="left">
                                               {classDetails.subject}
                                            </TableCell>                                
                                        </TableRow>
                                        <TableRow key="strength">
                                            <TableCell className="px-0" align="left">
                                                Strength:
                                            </TableCell>
                                            <TableCell className="px-0" align="left">
                                               {classDetails.strength}
                                            </TableCell>                                
                                        </TableRow>
                                        <TableRow key="description">
                                            <TableCell className="px-0" align="left">
                                                Description:
                                            </TableCell>
                                            <TableCell className="px-0" align="left">
                                               {classDetails.description}
                                            </TableCell>                                
                                        </TableRow>
                                  
                                </TableBody>
                            </Table>
                        </div>

                    </Card>
                </Grid>
            </Grid>

            
        </div>
    )
}

export default ClassPage
