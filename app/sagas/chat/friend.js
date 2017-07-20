import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import { request } from '../../utils/RequestUtil';

import { FRIEND_LIST } from '../../constants/Urls';
import {  fetchFriend,receiveFriend } from '../../actions/chat/friend';
import store from 'react-native-simple-store';
import { toastShort } from '../../utils/ToastUtil';


export function* requestFriend(userName) {
    try {
        yield put(fetchFriend())
        const friends = yield call(request,FRIEND_LIST,'post',JSON.stringify({ userName}));
        console.log(friends);
        yield put(receiveFriend(friends.data?friends.data:[]))
    } catch (error) {
        console.log(error)
        yield put(receiveFriend(null));
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}

export function* watchRequestFriend() {
    while (true) {
        const {userName} = yield take(types.REQUEST_FRIENDS);
        yield fork(
            requestFriend,
            userName
        );
    }
}

