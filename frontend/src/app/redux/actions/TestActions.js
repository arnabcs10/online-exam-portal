import axios from 'axios.js';

export const TEST_STATUS_REQUEST = 'TEST_STATUS_REQUEST';
export const TEST_STATUS_SUCCESS = 'TEST_STATUS_SUCCESS';
export const TEST_STATUS_FAIL = 'TEST_STATUS_FAIL';

export const TEST_DETAILS_REQUEST = 'TEST_DETAILS_REQUEST';
export const TEST_DETAILS_SUCCESS = 'TEST_DETAILS_SUCCESS';
export const TEST_DETAILS_FAIL = 'TEST_DETAILS_FAIL';

export const getTestStatus = (testId) => async (dispatch) =>{
    try{
        
        dispatch({ type: TEST_STATUS_REQUEST });
        
        const { data } = await axios.get(`/api/exams/status/${testId}`);
        
        dispatch({ type: TEST_STATUS_SUCCESS, payload: data.status })
    }catch(error){
        dispatch( { 
            type: TEST_STATUS_FAIL,
            message:{
                variant: 'error',
                content: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            } 
        });
    }
}


export const getTestDetails = (testId,studentId) => async (dispatch) =>{
    try{
        dispatch({ type: TEST_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/answers/${testId}/${studentId}`);
        
        // localStorage.setItem('testDetails', JSON.stringify(data));

        dispatch({ type: TEST_DETAILS_SUCCESS, payload: data });
    }catch(error){
        dispatch( { 
            type: TEST_DETAILS_FAIL,
            message:{
                variant: 'error',
                content: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            } 
        });
    }
}

export const updateAnswerSheet = (id, reqBody) => async (dispatch) =>{
    try{
        // dispatch({ type: TEST_DETAILS_REQUEST });

        const { data } = await axios.put(`/api/answers/${id}`, reqBody);
        
        

        // dispatch({ type: TEST_DETAILS_SUCCESS, payload: data });
    }catch(error){
        dispatch( { 
            type: TEST_DETAILS_FAIL,
            message:{
                variant: 'error',
                content: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            } 
        });
    }
}

