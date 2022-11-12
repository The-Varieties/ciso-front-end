import {GET_INSTANCE, GET_INSTANCES_LIST, ADD_NEW_INSTANCE, RESET_INSTANCE_LIST} from "../types";

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
                loading: false,
                instance: action.payload,
            }
        case GET_INSTANCES_LIST || ADD_NEW_INSTANCE:
            return{
                ...state,
                loading: false,
                instanceList: action.payload,
            }
        case RESET_INSTANCE_LIST:
            return{
                ...state,
                instanceList: []
            }
        default: return {...state}
    }
}