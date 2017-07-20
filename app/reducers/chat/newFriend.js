import * as types from '../../constants/ActionTypes';

const initialState = {
    success:false,
    newFriend:[]
};
export default function newFriend(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_NEW_FRIEND:
            return Object.assign({}, state, {
                success:false,
                newFriend:[]
            });
        case types.RECEIVE_NEW_FRIEND:
            return Object.assign({}, state, {
                success:true,
                newFriend:action.newFriend,
            });
        default:
            return state;
    }
}
