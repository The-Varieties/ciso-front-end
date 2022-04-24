import { GET_INSTANCE, INSTANCE_ERROR, GET_INSTANCES_LIST, DELETE_INSTANCE } from "../types";
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

export const getInstanceList = () => dispatch => {
    try{
        dispatch({
            type: GET_INSTANCES_LIST,
            payload: contentMap
        })
    }
    catch(e) {
        dispatch({
            type: INSTANCE_ERROR,
            payload: console.log(e)
        })
    }
}

export const deleteInstance = (targetId) => dispatch => {
    try{
        let index = contentMap.values.map(instance => instance.id).indexOf(targetId);
        contentMap.values.splice(index, 1)
        
        dispatch({
            type: DELETE_INSTANCE,
            payload: contentMap
        })
    }
    catch(e) {
        dispatch({
            type: INSTANCE_ERROR,
            payload: console.log(e)
        })
    }
}