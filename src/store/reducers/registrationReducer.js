import { GET_REGISTERUSER, ADD_NEW_USER } from "../types";

const initialState = {
    getregistration: null,
    loading: true
}

export default function RegistrationReducer(state = initialState, action) {
    switch(action.type) {
        case GET_REGISTERUSER:
            return {
                ...state,
                loading: false,
                instance: action.payload,
            }
        case ADD_NEW_USER:
            return{
                ...state,
                loading: false,
                getregistration: null,
            }
        default: return {...state}
    }
}