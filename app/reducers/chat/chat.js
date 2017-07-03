import * as types from '../../constants/ActionTypes';

const initialState = {
    loading: false,
    users: [],
    userName:"",
    chatInfos:[]
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
        case types.ONADD_CHAT:
            return Object.assign({}, state, {
                userName: action.userName
            });
        case types.ONCHAT_CHAT:
            return Object.assign({}, state, {
                chatInfos: addMessage(state,action)
            });
        default:
            return state;
    }
}
function addMessage(state, action) {
    state.chatInfos = state.chatInfos.concat(
        action.chatInfo
    );
    return state.chatInfos;
}