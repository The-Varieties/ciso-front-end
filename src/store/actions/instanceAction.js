import { GET_INSTANCE, INSTANCE_ERROR, GET_INSTANCES_LIST, DELETE_INSTANCE, ADD_NEW_INSTANCE } from "../types";
import axios from 'axios';


export const getInstance = (instanceName) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8000/api/metrics/get-usage-category/?instance=${instanceName}&time_interval`)

        dispatch({
            type: GET_INSTANCE,
            payload: res.data
        })
    }
    catch(e) {
        dispatch({
            type: INSTANCE_ERROR,
            payload: console.log(e)
        })
    }
}

export const getInstanceList = () => async dispatch => {
    try{
        const res = await axios.get(`http://localhost:8000/api/dashboard/instance/`)

        dispatch({
            type: GET_INSTANCES_LIST,
            payload: res.data
        })
    }
    catch(e) {
        dispatch({
            type: INSTANCE_ERROR,
            payload: console.log(e)
        })
    }
}

export const deleteInstance = (targetId) => async dispatch => {
    try{
        const res = await axios.delete(`http://localhost:8000/api/dashboard/instance/${targetId}/`)
        console.log(res)
    }
    catch(e) {
        dispatch({
            type: INSTANCE_ERROR,
            payload: console.log(e)
        })
    }
}

export const addNewInstance = (newInstanceMap) => async dispatch => {
    try {
        const res = await axios.post(`http://localhost:8000/api/dashboard/instance/`, newInstanceMap)

        dispatch({
            type: ADD_NEW_INSTANCE,
            payload: res.data
        })
    }
    catch(e) {
        dispatch({
            type: INSTANCE_ERROR,
            payload: console.log(e)
        })
    }
}