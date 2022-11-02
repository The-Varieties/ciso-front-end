import axios from 'axios'
import {FINANCIAL_REPORT, INSTANCE_ERROR} from "../types";

const auth_token = "Bearer " + JSON.parse(sessionStorage.getItem('token'))

export const getInstanceFinancialReport = (instanceAWSId) => async dispatch => {
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