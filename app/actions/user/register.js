import * as types from '../../constants/ActionTypes';

export function requestRegister(
    userName,
    password,
    email,
    verifyCode,
    nick
) {
    return {
        type: types.REQUEST_REGISTER,
        userName,
        password,
        email,
        verifyCode,
        nick
    };
}
export function fetchRegister() {
    return {
        type: types.FETCH_REGISTER
    };
}
export function receiveRegister(registerInfo) {
    return {
        type: types.RECEUVE_REGISTER,
        registerInfo
    };
}
