import {GET_REGISTERUSER, REGISTER_ERROR} from "../types";
import axios from 'axios';

export const getRegistrationUser = (UserInformation) => async dispatch => {
    try {
        const res = await axios({
            method:"post",
            url:`http://localhost:8000/api/registers/register/`,
            data: UserInformation,
        });
        
        dispatch({
            type: GET_REGISTERUSER,
            payload: res.data
        })
    }
    catch(e) {
        dispatch({
            type: REGISTER_ERROR,
            payload: console.log(e)
        })
    }
}