import * as types from '../../constants/ActionTypes';

const initialState = {
    success:false,
    chat:[]
};
export default function chat(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_CHAT:
            return Object.assign({}, state, {
                success:false,
                chat:[]
            });
        case types.RECEIVE_CHAT:
            return Object.assign({}, state, {
                success:true,
                chat:action.chat
            });
        default:
            return state;
    }
}
