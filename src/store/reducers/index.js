import { combineReducers } from "redux";
import instanceReducer from './instanceReducer'
import dataVisReducer from './dataVisReducer'
import UsageCategoryReducer from "./usageCategoryReducer"
import getloginuserReducer from "./getloginuserReducer";
import RegistrationReducer from "./registrationReducer";
import UserInfoReducer from './userInfoReducer';
import OptimizedReducer from './optimizedReducer';
import FinancialReportReducer from "./financialReportReducer";

export default combineReducers({
    instance: instanceReducer,
    visualization: dataVisReducer,
    usageCategory: UsageCategoryReducer,
    getloginuser: getloginuserReducer,
    registration:RegistrationReducer,
    userinfo:UserInfoReducer,
    optimizedInstance: OptimizedReducer,
    financialReport: FinancialReportReducer
})