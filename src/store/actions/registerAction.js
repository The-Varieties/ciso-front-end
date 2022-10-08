import {GET_REGISTERUSER, REGISTER_ERROR, ADD_NEW_USER} from "../types";
import axios from 'axios';

export const getRegistrationInstance = (UserInformation) => async dispatch => {
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

export const addNewUser = (UserInformation) => async dispatch => {
    try {        
        const res = await axios({
            method: 'post',
            url: 'http://localhost:8000/api/registers/register/',
            data: UserInformation,
        });

        dispatch({
            type: ADD_NEW_USER,
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