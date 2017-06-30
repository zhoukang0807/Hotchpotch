import * as types from '../../constants/ActionTypes';

export function requestLogin(
    userName,
    password
) {
    return {
        type: types.REQUEST_LOGIN,
        userName,
        password
    };
}
export function fetchLogin() {
    return {
        type: types.FETCH_LOGIN
    };
}
export function receiveLogin(loginInfo) {
    return {
        type: types.RECEUVE_LOGIN,
        loginInfo
    };
}
