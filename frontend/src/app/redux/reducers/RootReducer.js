import { combineReducers } from 'redux'
// import ScrumBoardReducer from './ScrumBoardReducer'
// import NotificationReducer from './NotificationReducer'
// import EcommerceReducer from './EcommerceReducer'
// import NavigationReducer from './NavigationReducer'
import {classReducer} from './ClassReducer';

const RootReducer = combineReducers({
    // notifications: NotificationReducer,
    // navigations: NavigationReducer,
    // scrumboard: ScrumBoardReducer,
    // ecommerce: EcommerceReducer,
    classStore: classReducer,
})

export default RootReducer
