import { TrainRounded } from '@material-ui/icons';
import { 
    TEST_STATUS_REQUEST,
    TEST_STATUS_SUCCESS, 
    TEST_STATUS_FAIL,

    TEST_DETAILS_REQUEST,
    TEST_DETAILS_SUCCESS, 
    TEST_DETAILS_FAIL,

    TEST_SUBMIT_REQUEST,
    TEST_SUBMIT_SUCCESS, 
    TEST_SUBMIT_FAIL,

} from '../actions/TestActions';

const initialState = {
    loading: false,
    message: null,
    status: 2,
    attempted: false,
    // TESTList: [],
    // testDetails: localStorage.getItem('testDetails') ? JSON.parse(localStorage.getItem('testDetails')) : null
    testDetails:  null
};

export const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST_STATUS_REQUEST:
            return { ...state, loading: true, message:null };
        case TEST_STATUS_SUCCESS:
            return { ...state, loading: false, status: action.payload, message:null  };
        case TEST_STATUS_FAIL:
            return { ...state, loading: false, message: action.message };
        
        case TEST_DETAILS_REQUEST:
            return { ...state, loading: true, message:null };
        case TEST_DETAILS_SUCCESS:
            return { ...state, loading: false, testDetails: action.payload, message:action.message  };
        case TEST_DETAILS_FAIL:
            return { ...state, loading: false, message: action.message };

        case TEST_SUBMIT_REQUEST:
            return { ...state, loading: true, message:null };
        case TEST_SUBMIT_SUCCESS:
            return { ...state, loading: false, message:action.message, attempted: true  };
        case TEST_SUBMIT_FAIL:
            return { ...state, loading: false, message: action.message };
        default:
            return state;
    }
}

