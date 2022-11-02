import { FINANCIAL_REPORT } from "../types";

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
        default: return {...state}
    }
}