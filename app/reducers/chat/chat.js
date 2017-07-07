import * as types from '../../constants/ActionTypes';

const initialState = {
    users: []
};

export default function chat(state = initialState, action) {
    switch (action.type) {
        case  types.RECEUVE_USERLIST:
            return Object.assign({}, state, {
                users: action.users
            });
        default:
            return state;
    }
}
