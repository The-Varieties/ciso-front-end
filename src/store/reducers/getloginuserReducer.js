import { GET_USERLOGIN } from "../types";

export default function getloginuserReducer(state = {loading: true}, action) {
    switch(action.type) {
        case GET_USERLOGIN:
            return {
                ...state,
                loading: false,
                getloginuser: action.payload
            }
        default: return {...state}
    }
}