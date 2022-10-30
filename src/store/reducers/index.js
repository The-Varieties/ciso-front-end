import { combineReducers } from "redux";
import instanceReducer from './instanceReducer'
import dataVisReducer from './dataVisReducer'
import UsageCategoryReducer from "./usageCategoryReducer"
import getloginuserReducer from "./getloginuserReducer";
import RegistrationReducer from "./registrationReducer";
import UserInfoReducer from './userInfoReducer';
import OptimizedReducer from '';

export default combineReducers({
    instance: instanceReducer,
    visualization: dataVisReducer,
    usageCategory: UsageCategoryReducer,
    getloginuser: getloginuserReducer,
    registration:RegistrationReducer,
    userinfo:UserInfoReducer,
    optimziedinstance:OptimizedReducer
})