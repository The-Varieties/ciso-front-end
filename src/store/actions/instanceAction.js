import { GET_INSTANCE, INSTANCE_ERROR, GET_INSTANCES_LIST, ADD_NEW_INSTANCE, GET_VIS, GET_USAGE_CATEGORY} from "../types";
import axios from 'axios';

const auth_token = JSON.parse(sessionStorage.getItem('token'))

export const getInstance = (targetId) => async dispatch => {
    try {
        const res = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}/dashboard/instance/${targetId}/`,
            headers: {
                "Authorization": auth_token,
            },
        });

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

export const getUsageCategory = (instance_name, time_interval) => async dispatch => {
    try {
        const res = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}/metrics/get-usage-category/?instance=${instance_name}&time_interval=${time_interval}`,
            headers: {
                "Authorization": auth_token,
            },
        });

        dispatch({
            type: GET_USAGE_CATEGORY,
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

export const getDataVis = (instanceName, time_interval) => async dispatch => {
    try {
        let res = [];

        res.push(await axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}/metrics/data-vis-cpu/?instance=${instanceName}&time_interval=${time_interval}`,
            headers: {
                "Authorization": auth_token,
            },
        }));

        res.push(await axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}/metrics/data-vis-ram/?instance=${instanceName}&time_interval=${time_interval}`,
            headers: {
                "Authorization": auth_token,
            },
        }));

        dispatch({
            type: GET_VIS,
            payload: res,
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
        const res = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}/dashboard/instance/`,
            headers: {
                "Authorization": auth_token,
            },
        });

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
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/dashboard/instance/${targetId}/`)
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
        const res = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}/dashboard/instance/`,
            data: newInstanceMap,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

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