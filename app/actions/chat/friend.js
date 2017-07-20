import * as types from '../../constants/ActionTypes';

export function requestFriend(userName) {
    return {
        type: types.REQUEST_FRIENDS,
        userName
    };
}

export function fetchFriend() {
    return {
        type: types.FETCH_FRIENDS,
    };
}

export function receiveFriend(friends) {
    return {
        type: types.RECEIVE_FRIENDS,
        friends,
    };
}
