import { 
    CLASS_LIST_REQUEST,
    CLASS_LIST_SUCCESS, 
    CLASS_LIST_FAIL,

    CLASS_CREATE_REQUEST,
    CLASS_CREATE_SUCCESS, 
    CLASS_CREATE_FAIL,


} from '../actions/ClassActions';

const initialState = {
    loading: false,
    message: null,
    classList: [] 
};

export const classReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLASS_LIST_REQUEST:
            return { ...state, loading: true, classList: [] };
        case CLASS_LIST_SUCCESS:
            return { ...state, loading: false, classList: action.payload  };
        case CLASS_LIST_FAIL:
            return { ...state, loading: false, message: action.message };
        case CLASS_CREATE_REQUEST:
            return { ...state, loading: true, message:null };
        case CLASS_CREATE_SUCCESS:
            return { loading: false, classList: [...state.classList, action.payload], message:action.message  };
        case CLASS_CREATE_FAIL:
            return { ...state, loading: false, message: action.message };
        default:
            return state;
    }
}

