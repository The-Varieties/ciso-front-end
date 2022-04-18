import { GET_INSTANCE, INSTANCE_ERROR } from "../types";
import axios from 'axios';

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