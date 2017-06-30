import * as types from '../constants/ActionTypes';

const initialState = {
    loading: false,
    loginInfo: {}
};

export default function login(state = initialState, action) {
    switch (action.type) {
        case  types.FETCH_LOGIN:
            return Object.assign({}, state, {
                loading: true
            });
        case types.RECEUVE_LOGIN:
            return Object.assign({}, state, {
                loading: false,
                loginInfo: action.loginInfo
            });
        default:
            return state;
    }
}
