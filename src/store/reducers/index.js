import { combineReducers } from "redux";
import instanceReducer from './instanceReducer'
import dataVisReducer from './dataVisReducer'
import UsageCategoryReducer from "./usageCategoryReducer";

export default combineReducers({
    instance: instanceReducer,
    visualization: dataVisReducer,
    usageCategory: UsageCategoryReducer
})