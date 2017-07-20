import * as types from '../../constants/ActionTypes';

const initialState = {
    success:false,
    friend:[]
};
export default function friend(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_FRIENDS:
            return Object.assign({}, state, {
                success:false,
                friend:[]
            });
        case types.RECEIVE_FRIENDS:
            return Object.assign({}, state, {
                success:true,
                friend:action.friends,
            });
        default:
            return state;
    }
}
