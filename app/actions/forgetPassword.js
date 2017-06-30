import * as types from '../constants/ActionTypes';

export function requestForgetPassword(
    password,
    email,
    verifyCode
) {
    return {
        type: types.REQUEST_FORGETPASSWORD,
        password,
        email,
        verifyCode
    };
}
export function fetchForgetPassword() {
    return {
        type: types.FETCH_FORGETPASSWORD
    };
}
export function receiveForgetPassword(forgetInfo) {
    return {
        type: types.RECEUVE_FORGETPASSWORD,
        forgetInfo
    };
}
