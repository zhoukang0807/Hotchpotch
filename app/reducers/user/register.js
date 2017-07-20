import * as types from '../../constants/ActionTypes';

const initialState = {
    loading: false,
    registerInfo:{}
};

export default function register(state = initialState, action) {
    switch (action.type) {
        case  types.FETCH_REGISTER:
            return Object.assign({}, state, {
                loading: true
            });
        case types.RECEUVE_REGISTER:
            return Object.assign({}, state, {
                loading: false,
                registerInfo: action.registerInfo
            });
        default:
            return state;
    }
}
