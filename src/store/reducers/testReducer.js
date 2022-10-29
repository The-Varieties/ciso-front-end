import { TEST_INSTANCE_TYPE, RESET_INSTANCE_TYPE } from "../types";

const initialState = {
    type: null,
    loading: true
}

export default function TestReducer(state = initialState, action) {
    switch(action.type) {
        case TEST_INSTANCE_TYPE:
            return {
                ...state,
                loading: false,
                type: action.payload,
            }
        case RESET_INSTANCE_TYPE:
            return {...initialState}
        default: return {...state}
    }
}