import * as types from '../../constants/ActionTypes';

const initialState = {
    loading:false,
    contacts: []
};

export default function contact(state = initialState, action) {
    switch (action.type) {
        case  types.FETCH_CONTACT_LIST:
            return Object.assign({}, state, {
                loading:true
            });
        case  types.RECEIVE_CONTACT_LIST:
            return Object.assign({}, state, {
                loading:false,
                contacts: action.contacts
            });
        default:
            return state;
    }
}
