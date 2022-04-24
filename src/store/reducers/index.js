import { combineReducers } from "redux";
import instanceReducer from './instanceReducer'

export default combineReducers({
    instance: instanceReducer
})