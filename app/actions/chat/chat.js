import * as types from '../../constants/ActionTypes';

export function requestUserList(id) {
    return {
        type: types.REQUSET_USERLIST,
        id
    };
}
export function receiveUserList(users) {
    return {
        type: types.RECEUVE_USERLIST,
        users
    };
}
