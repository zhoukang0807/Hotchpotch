import * as types from '../../constants/ActionTypes';

export function requestChat(userName,friendName) {
    return {
        type: types.REQUEST_CHAT,
        userName,
        friendName
    };
}

export function fetchChat() {
    return {
        type: types.FETCH_CHAT,
    };
}

export function receiveChat(chat) {
    return {
        type: types.RECEIVE_CHAT,
        chat,
    };
}

export function onAddChat(userName) {
    return {
        type: types.ONADD_CHAT,
        userName,
    };
}
export function onChatChat(chatInfo) {
    return {
        type: types.ONCHAT_CHAT,
        chatInfo,
    };
}

