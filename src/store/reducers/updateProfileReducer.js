import {GET_USER, UPDATE_PROFILE, USER_ERROR} from '../types';

const initialState = {
    instance: [],
    loading: true,
    instanceList: [],
}

export default function updateProfileReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER:
            return {
                ...state,
                loading: false,
                instance: action.payload,
            }
        case UPDATE_PROFILE:
            return{
                ...state,
                loading: false,
                instanceList: action.payload,
            }
        default: return {...state}
    }
}