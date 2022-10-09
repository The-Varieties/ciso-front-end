import {GET_USER, UPDATE_PROFILE,USER_ERROR} from '../types';
import axios from 'axios';

export const getUser = (user) => async dispatch => {
    
    try{
        const res = await axios.get()

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

export const getUpdateProfile = (user) => async dispatch => {
    
    try{
        const res = await axios.get()

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