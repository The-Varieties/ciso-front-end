import {GET_REGISTER, REGISTER_ERROR} from "../types";
import axios from 'axios';

export const getRegisterUserInstance = (uname, fname, lname, email, pass, cpass) => async dispatch => {
    try {
        const res = await axios({
            method:"post",
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

export const resetLogin = () => async dispatch => {
    try {
        dispatch({
            type: RESET_LOGIN
        })
    }
    catch(e) {
        dispatch({
            type: LOGGIN_ERROR,
            payload: console.log(e)
        })
    }
}
