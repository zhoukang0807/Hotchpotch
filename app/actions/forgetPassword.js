import * as types from '../constants/ActionTypes';

export function requestForget(
    userName,
    password,
    email,
    verifyCode
) {
    return {
        type: types.REQUEST_FORGETPASSWORD,
        userName,
        password,
        email,
        verifyCode
    };
}
export function fetchForget() {
    return {
        type: types.FETCH_FORGETPASSWORD
    };
}
export function receiveForget(forgetInfo) {
    return {
        type: types.RECEUVE_FORGETPASSWORD,
        forgetInfo
    };
}
