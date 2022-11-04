import {ALL_INSTANCES_FINANCIAL_REPORT, FINANCIAL_REPORT, RESET_FINANCIAL_REPORT} from "../types";

const initialState = {
    financialReport: null,
    loading: true
}

export default function FinancialReportReducer(state = initialState, action) {
    switch(action.type) {
        case FINANCIAL_REPORT:
            return {
                ...state,
                financialReport: action.payload,
                loading: false
            }
        case ALL_INSTANCES_FINANCIAL_REPORT:
            return {
                ...state,
                financialReport: action.payload,
                loading: false
            }
        case RESET_FINANCIAL_REPORT:
            return {
                ...state,
                financialReport: null,
                loading: true
            }
        default: return {...state}
    }
}