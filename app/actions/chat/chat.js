import * as types from '../../constants/ActionTypes';

export function requestUserList(roomName) {
    return {
        type: types.REQUSET_USERLIST,
        roomName
    };
}
export function receiveUserList(users) {
    return {
        type: types.RECEUVE_USERLIST,
        users
    };
}
