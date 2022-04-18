import { GET_INSTANCE } from "../types";

const initialState = {
    instance: [],
    loading: true
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_INSTANCE:
            return {
                ...state,
                instance: action.payload,
                loading: false
            }
        default: return {...state}
    }
}