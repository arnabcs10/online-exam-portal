import axios from 'axios.js';

export const CLASS_LIST_REQUEST = 'CLASS_LIST_REQUEST';
export const CLASS_LIST_SUCCESS = 'CLASS_LIST_SUCCESS';
export const CLASS_LIST_FAIL = 'CLASS_LIST_FAIL';

export const CLASS_CREATE_REQUEST = 'CLASS_CREATE_REQUEST';
export const CLASS_CREATE_SUCCESS = 'CLASS_CREATE_SUCCESS';
export const CLASS_CREATE_FAIL = 'CLASS_CREATE_FAIL';

export const CLASS_DETAILS_REQUEST = 'CLASS_DETAILS_REQUEST';
export const CLASS_DETAILS_SUCCESS = 'CLASS_DETAILS_SUCCESS';
export const CLASS_DETAILS_FAIL = 'CLASS_DETAILS_FAIL';

export const listClasses = () => async (dispatch) =>{
    try{
        dispatch({ type: CLASS_LIST_REQUEST });

        const { data } = await axios.get(`/api/groups`);
        
        dispatch({ type: CLASS_LIST_SUCCESS, payload: data })
    }catch(error){
        dispatch( { 
            type: CLASS_LIST_FAIL,
            message:{
                variant: 'error',
                content: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            } 
        });
    }
}

export const createClass = (classDetails) => async (dispatch) => {
    try {
        dispatch({
            type: CLASS_CREATE_REQUEST,
        });


        const {data } = await axios.post(`/api/groups`, classDetails);


        dispatch({
            type: CLASS_CREATE_SUCCESS,
            payload: data,
            message:{
                variant: 'success',
                content: 'Class created successfully'
            }
        });
        
        
    } catch (error) {
        dispatch( { 
            type: CLASS_CREATE_FAIL,
            message:{
                variant: 'error',
                content: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            }
        
        });
    }
}

export const getClassDetails = (classId) => async (dispatch) =>{
    try{
        dispatch({ type: CLASS_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/groups/${classId}`);
        
        localStorage.setItem('classDetails', JSON.stringify(data));

        dispatch({ type: CLASS_DETAILS_SUCCESS, payload: data });
    }catch(error){
        dispatch( { 
            type: CLASS_DETAILS_FAIL,
            message:{
                variant: 'error',
                content: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            } 
        });
    }
}

export const addNewStudent = (studentData,classId,many) => async (dispatch) =>{
    try{
        dispatch({ type: CLASS_DETAILS_REQUEST });

        if(many){
            await axios.post('/api/students/many', {studentArray:studentData, classId});
        }else{
            await axios.post('/api/students', {...studentData, classId});
        }
        

        const { data } = await axios.get(`/api/groups/${classId}`);
        
        localStorage.setItem('classDetails', JSON.stringify(data));

        dispatch({ type: CLASS_DETAILS_SUCCESS, payload: data, 
            message:{
            variant: 'success',
            content: 'Students are added successfully'
        } });
    }catch(error){
        dispatch( { 
            type: CLASS_DETAILS_FAIL,
            message:{
                variant: 'error',
                content: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            } 
        });
    }
}
