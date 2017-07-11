import * as types from '../../constants/ActionTypes';

export function requestContactList(id) {
    return {
        type: types.REQUSET_CONTACT_LIST
    };
}
export function fetchContactList(id) {
    return {
        type: types.FETCH_CONTACT_LIST
    };
}
export function receiveContactList(contacts) {
    return {
        type: types.RECEIVE_CONTACT_LIST,
        contacts
    };
}
