import * as types from '../../constants/ActionTypes';

const initialState = {
    loading: false,
    forgetInfo:{}
};

export default function login(state = initialState, action) {
    switch (action.type) {
        case  types.FETCH_FORGETPASSWORD:
            return Object.assign({}, state, {
                loading: true
            });
        case types.RECEUVE_FORGETPASSWORD:
            return Object.assign({}, state, {
                loading: false,
                forgetInfo: action.forgetInfo
            });
        default:
            return state;
    }
}
