import {GET_USER, UPDATE_PROFILE,USER_ERROR} from '../types';
import axios from 'axios';

export const getUser = (targetId) => async dispatch => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/users/${targetId}`)

        dispatch({
            type: GET_USER, 
            payload: res.data
        })
    }
    catch(e) {
        dispatch({
            type: USER_ERROR,
            payload: console.log(e)
        })
    }
}

export const getUpdateProfile = (targetId) => async dispatch => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/users/${targetId}`)

        dispatch({
            type: UPDATE_PROFILE, 
            payload: res.data
        })
    }
    catch(e) {
        dispatch({
            type: USER_ERROR,
            payload: console.log(e)
        })
    }
}