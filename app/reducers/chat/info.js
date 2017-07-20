import * as types from '../../constants/ActionTypes';

const initialState = {
    success:false,
    info:{}
};
export default function info(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_INFO:
            return Object.assign({}, state, {
                success:false,
                info:{}
            });
        case types.RECEIVE_INFO:
            return Object.assign({}, state, {
                success:true,
                info:action.info,
            });
        default:
            return state;
    }
}
