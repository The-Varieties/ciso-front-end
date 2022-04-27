import { GET_INSTANCE, INSTANCE_ERROR, GET_INSTANCES_LIST, DELETE_INSTANCE, ADD_NEW_INSTANCE } from "../types";
import axios from 'axios';

let contentMap = {name: "instanceList", values: [
        {name: "Instance 1", id: "de8q9dn9", ipAddress: "192.168.77.43", instanceStatus: "Optimized"},
        {name: "Instance 2", id: "324iorn", ipAddress: "10.0.8.55", instanceStatus: "Overutilized"},
        {name: "Instance 3", id: "f32fplr4", ipAddress: "172.168.9.98", instanceStatus: "Underutilized"},
    ]
};

export const getInstance = () => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8000/api/metrics/get-usage-category?instance=node_exporter`)
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