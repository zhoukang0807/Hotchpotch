import * as types from '../../constants/ActionTypes';

export function requestChatList(userName) {
    return {
        type: types.REQUEST_CHAT_LIST,
        userName
    };
}

export function fetchChatList() {
    return {
        type: types.FETCH_CHAT_LIST,
    };
}

export function receiveChatList(chatList) {
    return {
        type: types.RECEIVE_CHAT_LIST,
        chatList,
    };
}


