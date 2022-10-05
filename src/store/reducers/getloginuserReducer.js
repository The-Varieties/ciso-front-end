import { GET_USERLOGIN } from "../types";

const initialState = {
    getloginuser: [],
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
        default: return {...state}
    }
}