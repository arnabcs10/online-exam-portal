import { 
    EXAM_LIST_REQUEST,
    EXAM_LIST_SUCCESS, 
    EXAM_LIST_FAIL,

    EXAM_CREATE_REQUEST,
    EXAM_CREATE_SUCCESS, 
    EXAM_CREATE_FAIL,

    EXAM_DETAILS_REQUEST,
    EXAM_DETAILS_SUCCESS, 
    EXAM_DETAILS_FAIL,

    EXAM_RESULTS_REQUEST,
    EXAM_RESULTS_SUCCESS,
    EXAM_RESULTS_FAIL,

} from '../actions/ExamActions';

const initialState = {
    loading: false,
    message: null,
    examList: [],
    examDetails: localStorage.getItem('examDetails') ? JSON.parse(localStorage.getItem('examDetails')) : {},
    results:[]
};

export const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case EXAM_LIST_REQUEST:
            return { ...state, loading: true, examList: [], message:null };
        case EXAM_LIST_SUCCESS:
            return { ...state, loading: false, examList: action.payload, message:null  };
        case EXAM_LIST_FAIL:
            return { ...state, loading: false, message: action.message };
        case EXAM_CREATE_REQUEST:
            return { ...state, loading: true, message:null };
        case EXAM_CREATE_SUCCESS:
            return { ...state, loading: false, examDetails: action.payload, message:action.message  };
        case EXAM_CREATE_FAIL:
            return { ...state, loading: false, message: action.message };
        case EXAM_DETAILS_REQUEST:
            return { ...state, loading: true, message:null };
        case EXAM_DETAILS_SUCCESS:
            return { ...state, loading: false, examDetails: action.payload, message:action.message  };
        case EXAM_DETAILS_FAIL:
            return { ...state, loading: false, message: action.message };

        case EXAM_RESULTS_REQUEST:
            return { ...state, loading: action.payload, message:null };
        case EXAM_RESULTS_SUCCESS:
            return { ...state, loading: false, results: action.payload, message:action.message  };
        case EXAM_RESULTS_FAIL:
            return { ...state, loading: false, message: action.message };
        default:
            return state;
    }
}

