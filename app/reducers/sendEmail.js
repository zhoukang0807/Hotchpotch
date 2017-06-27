import * as types from '../constants/ActionTypes';

const initialState = {
    loading: false,
    code:""
};

export default function sendEmail(state = initialState, action) {
    switch (action.type) {
        case  types.FETCH_SENDEMAIL:
            return Object.assign({}, state, {
                loading: true
            });
        case types.RECEUVE_SENDEMAIL:
            return Object.assign({}, state, {
                loading: false,
                code:action.code
            });
        default:
            return state;
    }
}
