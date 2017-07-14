import * as types from '../../constants/ActionTypes';

export function requestQueryUser(userName,friendName) {
    return {
        type: types.REQUEST_QUERY_USER,
        userName,
        friendName
    };
}
export function fetchQueryUser(){
    return {
        type: types.FETCH_QUERY_USER
    };
}
export function receiveQueryUser(friendNames) {
    return {
        type: types.RECEIVE_QUERY_USER,
        friendNames
    };
}
