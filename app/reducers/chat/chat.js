import * as types from '../../constants/ActionTypes';

const initialState = {
    loading: false,
    users: []
};
export default function chat(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_CHAT:
            return Object.assign({}, state, {
                loading: true,
                users: []
            });
        case types.RECEIVE_CHAT:
            return Object.assign({}, state, {
                loading: false,
                users: action.users
            });
        default:
            return state;
    }
}
