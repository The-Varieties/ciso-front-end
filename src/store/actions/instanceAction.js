import { GET_INSTANCE, INSTANCE_ERROR, GET_INSTANCES_LIST, ADD_NEW_INSTANCE, GET_VIS } from "../types";
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

export const getDataVis = (instanceName, metric) => async dispatch => {
    try {
        const res = (await axios.get(`http://localhost:8000/api/metrics/data-vis/?instance=${instanceName}&time_interval=24 hours&metric=${metric}`))
        // const performance_7d = (await axios.get(`http://localhost:8000/api/metrics/data-vis/?instance=${instanceName}&time_interval=7 days&metric=${metric}`))
        // const performance_30d = (await axios.get(`http://localhost:8000/api/metrics/data-vis/?instance=${instanceName}&time_interval=30 days&metric=${metric}`))

        // console.log(performance_7d)

        dispatch({
            type: GET_VIS,
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
        await axios.delete(`http://localhost:8000/api/dashboard/instance/${targetId}/`)
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