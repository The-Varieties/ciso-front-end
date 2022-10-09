import { combineReducers } from "redux";
import instanceReducer from './instanceReducer'
import dataVisReducer from './dataVisReducer'
import UsageCategoryReducer from "./usageCategoryReducer"
import getloginuserReducer from "./getloginuserReducer";
import RegistrationReducer from "./registrationReducer";
import UpdateProfileReducer from './updateProfileReducer';

export default combineReducers({
    instance: instanceReducer,
    visualization: dataVisReducer,
    usageCategory: UsageCategoryReducer,
    getloginuser: getloginuserReducer,
    registration:RegistrationReducer,
    updateprofile:UpdateProfileReducer
})