import { GET_USERLOGIN, RESET_LOGIN } from "../types";

const initialState = {
    getloginuser: null,
    loading: true,
}

export default function getloginuserReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USERLOGIN:
            return {
                ...state,
                loading: false,
                getloginuser: action.payload
            }
        case RESET_LOGIN:
            return {
                ...state,
                loading: true,
                getloginuser: null
            }
        default: return {...state}
    }
}
