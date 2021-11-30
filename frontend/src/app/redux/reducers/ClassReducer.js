import { 
    CLASS_LIST_REQUEST,
    CLASS_LIST_SUCCESS, 
    CLASS_LIST_FAIL,

    CLASS_CREATE_REQUEST,
    CLASS_CREATE_SUCCESS, 
    CLASS_CREATE_FAIL,

    CLASS_DETAILS_REQUEST,
    CLASS_DETAILS_SUCCESS, 
    CLASS_DETAILS_FAIL,

} from '../actions/ClassActions';

const initialState = {
    loading: false,
    message: null,
    classList: [],
    classDetails: localStorage.getItem('classDetails') ? JSON.parse(localStorage.getItem('classDetails')) : {}
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
            return { ...state, loading: false, classList: [...state.classList, action.payload], message:action.message  };
        case CLASS_CREATE_FAIL:
            return { ...state, loading: false, message: action.message };
        case CLASS_DETAILS_REQUEST:
            return { ...state, loading: true };
        case CLASS_DETAILS_SUCCESS:
            return { ...state, loading: false, classDetails: action.payload, message:action.message  };
        case CLASS_DETAILS_FAIL:
            return { ...state, loading: false, message: action.message };
        default:
            return state;
    }
}

