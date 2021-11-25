import axios from 'axios.js';

export const CLASS_LIST_REQUEST = 'CLASS_LIST_REQUEST';
export const CLASS_LIST_SUCCESS = 'CLASS_LIST_SUCCESS';
export const CLASS_LIST_FAIL = 'CLASS_LIST_FAIL';

export const listClasses = () => async (dispatch) =>{
    try{
        dispatch({ type: CLASS_LIST_REQUEST });

        const { data } = await axios.get(`/api/groups`);
        
        dispatch({ type: CLASS_LIST_SUCCESS, payload: data })
    }catch(error){
        dispatch( { 
            type: CLASS_LIST_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
        
        });
    }
}