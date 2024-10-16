import { combineReducers } from 'redux'
// import ScrumBoardReducer from './ScrumBoardReducer'
// import NotificationReducer from './NotificationReducer'
// import EcommerceReducer from './EcommerceReducer'
// import NavigationReducer from './NavigationReducer'
import {classReducer} from './ClassReducer';
import {examReducer} from './ExamReducer';
import {testReducer} from './TestReducer';

const RootReducer = combineReducers({
    // notifications: NotificationReducer,
    // navigations: NavigationReducer,
    // scrumboard: ScrumBoardReducer,
    // ecommerce: EcommerceReducer,
    classStore: classReducer,
    examStore: examReducer,
    testStore: testReducer
})

export default RootReducer
