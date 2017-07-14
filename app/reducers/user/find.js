import * as types from '../../constants/ActionTypes';

const initialState = {
    loading: false,
    findResult: null
};

export default function find(state = initialState, action) {
    switch (action.type) {
        case  types.FETCH_FIND:
            return Object.assign({}, state, {
                loading: true
            });
        case types.RECEUVE_FIND:
            return Object.assign({}, state, {
                loading: false,
                findResult: action.findResult
            });
        default:
            return state;
    }
}
