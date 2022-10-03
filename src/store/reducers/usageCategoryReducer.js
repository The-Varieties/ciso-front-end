import { GET_USAGE_CATEGORY } from "../types";

const initialState = {
    usageCategory: [],
    loading: true,
}

export default function UsageCategoryReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USAGE_CATEGORY:
            return {
                ...state,
                loading: false,
                usageCategory: action.payload
            }
        default: return {...state}
    }
}