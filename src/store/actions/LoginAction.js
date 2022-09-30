import { GET_USERLOGIN} from "../types";
import axios from 'axios';

export const getLoginUserInstace = (targetuserId) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8000/api/users/users/${targetuserId}/`)

        dispatch({
            type: GET_USERLOGIN,
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