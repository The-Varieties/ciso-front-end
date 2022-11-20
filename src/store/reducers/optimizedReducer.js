import {OPTIMIZED_INSTANCE, RESET_INSTANCE_TYPE} from "../types";

const initialState = {
    optimizedInstance: [],
    loading: true,
}

export default function optimizedReducer(state = initialState, action) {
    switch(action.type) {
        case OPTIMIZED_INSTANCE:
            return {
                ...state,
                loading: false,
                optimizedInstance: action.payload
            }
        case RESET_INSTANCE_TYPE:
            return {...initialState}
        default: return {...state}
    }
}
