import * as types from '../../constants/ActionTypes';

const initialState = {
    success:false,
    chatList:{}
};
export default function chatList(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_CHAT_LIST:
            return Object.assign({}, state, {
                success:false,
                chatList:{}
            });
        case types.RECEIVE_CHAT_LIST:
            return Object.assign({}, state, {
                success:true,
                chatList:action.chatList
            });
        default:
            return state;
    }
}
