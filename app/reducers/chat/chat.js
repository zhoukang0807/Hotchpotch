import * as types from '../../constants/ActionTypes';

const initialState = {
};

export default function read(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_CHAT:
            return Object.assign({}, state, {
            });
        case types.RECEIVE_CHAT:
            return Object.assign({}, state, {
            });
        default:
            return state;
    }
}
