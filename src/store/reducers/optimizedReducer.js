import { OPTIMIZED_INSTANCE } from "../types";

const initialState = {
    optimziedInstance: null,
    loading: true,
}

export default function optimizedReducer(state = initialState, action) {
    switch(action.type) {
        case OPTIMIZED_INSTANCE:
            return {
                ...state,
                loading: false,
                optimziedInstance: action.payload
            }
        default: return {...state}
    }
}