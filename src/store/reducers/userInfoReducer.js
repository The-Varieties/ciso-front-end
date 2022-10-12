import {GET_USER, UPDATE_PROFILE} from '../types';

const initialState = {
    userinfo: [],
    loading: true
}

export default function UserInfoReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER:
            return {
                ...state,
                loading: false,
                userinfo: action.payload,
            }
        case UPDATE_PROFILE:
            return{
                ...state,
                loading: false,
                userinfo: action.payload,
            }
        default: return {...state}
    }
}