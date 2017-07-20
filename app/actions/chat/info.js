import * as types from '../../constants/ActionTypes';

export function requestInfo(userName) {
    return {
        type: types.REQUEST_INFO,
        userName
    };
}

export function fetchInfo() {
    return {
        type: types.FETCH_INFO,
    };
}

export function receiveInfo(info) {
    return {
        type: types.RECEIVE_INFO,
        info,
    };
}
