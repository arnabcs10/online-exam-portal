import { 
    CLASS_LIST_REQUEST,
    CLASS_LIST_SUCCESS, 
    CLASS_LIST_FAIL,


} from '../actions/ClassActions';

export const classListReducer = (state = { classes: [] }, action) => {
    switch (action.type) {
        case CLASS_LIST_REQUEST:
            return { loading: true, classes: [] };
        case CLASS_LIST_SUCCESS:
            return { loading: false, classes: action.payload  };
        case CLASS_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
