import { GET_INSTANCE, GET_INSTANCES_LIST, DELETE_INSTANCE, ADD_NEW_INSTANCE, GET_VIS } from "../types";

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
        default: return {...state}
    }
}