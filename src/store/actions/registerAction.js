import {GET_REGISTERUSER, REGISTER_ERROR} from "../types";
import axios from 'axios';

export const getRegistrationUser = (UserInformation) => async dispatch => {
    // console.log(UserInformation)
    try {
        const res = await axios({
            method:"post",
            url:`http://localhost:8000/api/registers/register/`,
            data: UserInformation,
            headers: {
                "Content-type": "application/json",
            },
        });

        console.log(res)
        
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