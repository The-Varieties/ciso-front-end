import { GET_USERLOGIN, LOGGIN_ERROR} from "../types";
import axios from 'axios';

export const getLoginUserInstance = (uname, pass) => async dispatch => {
    try {
        const res = await axios({
            method:"get",
            url:`http://localhost:8000/api/logins/login?username=${uname}&password=${pass}`,
            'Access-Control-Allow-Origin':"*"
        });
        
        dispatch({
            type: GET_USERLOGIN,
            payload: res.data
        })
    }
    catch(e) {
        dispatch({
            type: LOGGIN_ERROR,
            payload: console.log(e)
        })
    }
}