import * as types from '../../constants/ActionTypes';

export function requestNewFriend(newFriend) {
    return {
        type: types.REQUEST_NEW_FRIEND,
        newFriend
    };
}

export function fetchNewFriend() {
    return {
        type: types.FETCH_NEW_FRIEND,
    };
}

export function receiveNewFriend(friends) {
    return {
        type: types.RECEIVE_NEW_FRIEND,
        friends,
    };
}
