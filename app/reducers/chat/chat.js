import * as types from '../../constants/ActionTypes';

const initialState = {
    success:false,
};
export default function chat(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_CHAT:
            return Object.assign({}, state, {
                success:false,
            });
        case types.RECEIVE_CHAT:
            return Object.assign({}, state, {
                success:true,
            });
        default:
            return state;
    }
}
