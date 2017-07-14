import * as types from '../../constants/ActionTypes';

const initialState = {
    loading: false,
    friendNames:[]
};

export default function addFriend(state = initialState, action) {
    switch (action.type) {
        case  types.FETCH_QUERY_USER:
            return Object.assign({}, state, {
                loading: true,
                friendNames:[]
            });
        case types.RECEIVE_QUERY_USER:
            return Object.assign({}, state, {
                loading: false,
                friendNames: action.friendNames
            });
        default:
            return state;
    }
}
