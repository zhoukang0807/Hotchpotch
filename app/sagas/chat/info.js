import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import { request } from '../../utils/RequestUtil';

import { QUERY_USERINFO } from '../../constants/Urls';
import {  fetchInfo,receiveInfo } from '../../actions/chat/info';
import store from 'react-native-simple-store';
import { toastShort } from '../../utils/ToastUtil';


export function* requestInfo(userName) {
    try {
        yield put(fetchInfo())
        const user = yield call(request,QUERY_USERINFO,'post',JSON.stringify({ userName}));
        console.log(user);
        yield put(receiveInfo(user.data))
    } catch (error) {
        console.log(error)
        yield put(receiveInfo(null));
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}

export function* watchRequestInfo() {
    while (true) {
        const {userName} = yield take(types.REQUEST_INFO);
        yield fork(
            requestInfo,
            userName
        );
    }
}

