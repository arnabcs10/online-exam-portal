import axios from 'axios.js';

export const EXAM_LIST_REQUEST = 'EXAM_LIST_REQUEST';
export const EXAM_LIST_SUCCESS = 'EXAM_LIST_SUCCESS';
export const EXAM_LIST_FAIL = 'EXAM_LIST_FAIL';

export const EXAM_CREATE_REQUEST = 'EXAM_CREATE_REQUEST';
export const EXAM_CREATE_SUCCESS = 'EXAM_CREATE_SUCCESS';
export const EXAM_CREATE_FAIL = 'EXAM_CREATE_FAIL';

export const EXAM_DETAILS_REQUEST = 'EXAM_DETAILS_REQUEST';
export const EXAM_DETAILS_SUCCESS = 'EXAM_DETAILS_SUCCESS';
export const EXAM_DETAILS_FAIL = 'EXAM_DETAILS_FAIL';

export const EXAM_RESULTS_REQUEST = 'EXAM_RESULTS_REQUEST';
export const EXAM_RESULTS_SUCCESS = 'EXAM_RESULTS_SUCCESS';
export const EXAM_RESULTS_FAIL = 'EXAM_RESULTS_FAIL';

export const listExams = (groupId) => async (dispatch) =>{
    try{
        
        dispatch({ type: EXAM_LIST_REQUEST });
        
        const { data } = await axios.get(`/api/exams/all/${groupId}`);
        
        dispatch({ type: EXAM_LIST_SUCCESS, payload: data })
    }catch(error){
        dispatch( { 
            type: EXAM_LIST_FAIL,
            message:{
                variant: 'error',
                content: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            } 
        });
    }
}

export const createExam = (examDetails) => async (dispatch) => {
    try {
        console.log("before request");
        dispatch({
            type: EXAM_CREATE_REQUEST,
        });

        
        const {data } = await axios.post(`/api/exams`, examDetails);
        console.log("after request");
        localStorage.setItem('examDetails', JSON.stringify(data));

        dispatch({
            type: EXAM_CREATE_SUCCESS,
            payload: data,
            message:{
                variant: 'success',
                content: 'Test created successfully'
            }
        });
        
        
    } catch (error) {
        dispatch( { 
            type: EXAM_CREATE_FAIL,
            message:{
                variant: 'error',
                content: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            }
        
        });
    }
}

export const getExamDetails = (id) => async (dispatch) =>{
    try{
        dispatch({ type: EXAM_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/exams/${id}`);
        
        localStorage.setItem('examDetails', JSON.stringify(data));

        dispatch({ type: EXAM_DETAILS_SUCCESS, payload: data });
    }catch(error){
        dispatch( { 
            type: EXAM_DETAILS_FAIL,
            message:{
                variant: 'error',
                content: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            } 
        });
    }
}
export const getExamResults = (id) => async (dispatch) =>{
    try{
        dispatch({ type: EXAM_RESULTS_REQUEST, payload: true });

        const { data } = await axios.get(`/api/answers/results/${id}`);
        
        // localStorage.setItem('examDetails', JSON.stringify(data));

        dispatch({ type: EXAM_RESULTS_SUCCESS, payload: data });
    }catch(error){
        dispatch( { 
            type: EXAM_RESULTS_FAIL,
            message:{
                variant: 'error',
                content: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            } 
        });
    }
}
export const computeExamResults = (id) => async (dispatch) =>{
    try{
        dispatch({ type: EXAM_RESULTS_REQUEST, payload: true });

        const { data } = await axios.put(`/api/answers/evaluation/${id}`);
        
        // localStorage.setItem('examDetails', JSON.stringify(data));

        dispatch({ type: EXAM_RESULTS_SUCCESS, payload: data });
    }catch(error){
        dispatch( { 
            type: EXAM_RESULTS_FAIL,
            message:{
                variant: 'error',
                content: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            } 
        });
    }
}

// export const addNewStudent = (studentData,classId,many) => async (dispatch) =>{
//     try{
//         dispatch({ type: EXAM_DETAILS_REQUEST });

//         if(many){
//             await axios.post('/api/students/many', {studentArray:studentData, classId});
//         }else{
//             await axios.post('/api/students', {...studentData, classId});
//         }
        

//         const { data } = await axios.get(`/api/groups/${classId}`);
        
//         localStorage.setItem('classDetails', JSON.stringify(data));

//         dispatch({ type: EXAM_DETAILS_SUCCESS, payload: data, 
//             message:{
//             variant: 'success',
//             content: 'Students are added successfully'
//         } });
//     }catch(error){
//         dispatch( { 
//             type: EXAM_DETAILS_FAIL,
//             message:{
//                 variant: 'error',
//                 content: error.response && error.response.data.message
//                         ? error.response.data.message
//                         : error.message
//             } 
//         });
//     }
// }
