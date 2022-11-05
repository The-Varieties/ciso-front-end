import axios from 'axios'
import {ALL_INSTANCES_FINANCIAL_REPORT, FINANCIAL_REPORT, INSTANCE_ERROR, RESET_FINANCIAL_REPORT} from "../types";

export const getInstanceFinancialReport = (instanceAWSId) => async dispatch => {
    const auth_token = "Bearer " + JSON.parse(sessionStorage.getItem('token'))

    try {
        const res = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}/financial/instance/?instance_id=${instanceAWSId}`,
            headers: {
                "Authorization": auth_token,
            },
        });

        dispatch({
            type: FINANCIAL_REPORT,
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

export const getAllInstanceFinancialReport = () => async dispatch => {
    const auth_token = "Bearer " + JSON.parse(sessionStorage.getItem('token'))

    try {
        const res = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}/financial/all-instances`,
            headers: {
                "Authorization": auth_token
            }
        });

        dispatch({
            type: ALL_INSTANCES_FINANCIAL_REPORT,
            payload: res.data
        })
    } catch(e) {
        dispatch({
            type: INSTANCE_ERROR,
            payload: console.log(e)
        })
    }
}

export const resetFinancialReport = () => async dispatch => {
    dispatch({ type: RESET_FINANCIAL_REPORT })
}