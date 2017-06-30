import * as types from '../../constants/ActionTypes';

export function requestChat() {
    return {
        type: types.REQUEST_CHAT,
    };
}

export function fetchChat() {
    return {
        type: types.FETCH_CHAT,

    };
}

export function receiveChat(list) {
    return {
        type: types.RECEIVE_CHAT,
        list,
    };
}
