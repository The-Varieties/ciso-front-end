import { combineReducers } from "redux";
import instanceReducer from './instanceReducer'
import dataVisReducer from './dataVisReducer'

export default combineReducers({
    instance: instanceReducer,
    visualization:  dataVisReducer
})