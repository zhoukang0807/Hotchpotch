import * as types from '../../constants/ActionTypes';

export function requestFind(
    name,
    navigate
) {
    return {
        type: types.REQUEST_FIND,
        name,
        navigate
    };
}
export function fetchFind() {
    return {
        type: types.FETCH_FIND
    };
}
export function receiveFind(findResult) {
    return {
        type: types.RECEUVE_FIND,
        findResult
    };
}
