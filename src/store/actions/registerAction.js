import {GET_REGISTERUSER, REGISTER_ERROR} from "../types";
import axios from 'axios';

export const getRegistrationUser = (UserInformation) => async dispatch => {
    try {
        const res = await axios({
            method:"post",
            url:`${process.env.REACT_APP_BASE_URL}/registers/register/`,
            data: UserInformation,
            headers: {
                "Content-type": "application/json",
            },
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