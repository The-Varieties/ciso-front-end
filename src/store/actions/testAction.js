import {TEST_INSTANCE_TYPE, INSTANCE_ERROR, RESET_INSTANCE_TYPE} from "../types";

export const testInstanceType = () => async dispatch => {
    try {
        await new Promise( res => setTimeout(res, 6000) );

        const res = "You got something from test"

        dispatch({
            type: TEST_INSTANCE_TYPE,
            payload: res
        })
    }
    catch(e) {
        dispatch({
            type: INSTANCE_ERROR,
            payload: console.log(e)
        })
    }
}

export const resetRecommendedInstanceType = () => async dispatch => {
    try {
        dispatch({
            type: RESET_INSTANCE_TYPE
        })
    } catch (e) {
        dispatch({
            type: INSTANCE_ERROR,
            payload: console.log(e)
        })
    }
}
