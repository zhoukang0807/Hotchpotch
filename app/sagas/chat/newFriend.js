import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import { request } from '../../utils/RequestUtil';
import { FRIEND_LIST } from '../../constants/Urls';
import {  fetchNewFriend,receiveNewFriend } from '../../actions/chat/newFriend';
import store from 'react-native-simple-store';
import { toastShort } from '../../utils/ToastUtil';


export function* requestNewFriend(newFriend) {
    try {
        yield put(fetchNewFriend())
        yield put(receiveFriend(newFriend))
    } catch (error) {
        console.log(error)
        yield put(receiveFriend(null));
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}

export function* watchRequestNewFriend() {
    while (true) {
        const {newFriend} = yield take(types.RECEIVE_NEW_FRIEND);
        yield fork(
            requestNewFriend,
            newFriend
        );
    }
}

