import { GET_USERLOGIN, LOGGIN_ERROR} from "../types";
import axios from 'axios';

export const getLoginUserInstance = (uname, pass) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8000/api/logins/login?username=${uname}&password=${pass}`)
        
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