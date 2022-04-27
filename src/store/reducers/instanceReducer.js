import { GET_INSTANCE, GET_INSTANCES_LIST, DELETE_INSTANCE, ADD_NEW_INSTANCE } from "../types";

const initialState = {
    instance: [],
    loading: true,
    instanceList: [],
}

export default function InstanceReducer(state = initialState, action) {
    switch(action.type) {
        case GET_INSTANCE:
            return {
                ...state,
                instance: action.payload,
                loading: false
            }
        case GET_INSTANCES_LIST || ADD_NEW_INSTANCE:
            return{
                ...state,
                instanceList: action.payload,
            }
        default: return {...state}
    }
}