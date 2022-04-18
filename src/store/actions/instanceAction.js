import { GET_INSTANCE, INSTANCE_ERROR } from "../types";
import axios from 'axios';

export const getInstance = () => async (dispatch) => {
    try {
        const res = axios.get(`http://localhost:8000/api/metrics/get-usage-category?instance`)
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