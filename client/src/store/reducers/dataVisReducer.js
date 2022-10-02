import { GET_VIS } from "../types";

export default function DataVisReducer(state = {loading: true}, action) {
    switch(action.type) {
        case GET_VIS:
            return {
                ...state,
                loading: false,
                visualization: action.payload
            }
        default: return {...state}
    }
}