import * as types from '../../constants/ActionTypes';

export function requestChat(
    userId,
    userName
) {
    return {
        type: types.REQUEST_CHAT,
        userId,
        userName
    };
}

export function fetchChat() {
    return {
        type: types.FETCH_CHAT,

    };
}

export function receiveChat(users) {
    return {
        type: types.RECEIVE_CHAT,
        users,
    };
}
