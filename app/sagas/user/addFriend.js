import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import { request } from '../../utils/RequestUtil';
import { QUERY_USERS } from '../../constants/Urls';
import {  fetchQueryUser,receiveQueryUser } from '../../actions/user/addFriend';
import store from 'react-native-simple-store';
import { toastShort } from '../../utils/ToastUtil';

export function* requestQueryUser(userName,friendName) {
    try {
        yield put(fetchQueryUser());
        const friendNames = yield call(request, QUERY_USERS, 'post', JSON.stringify({userName,friendName}));
        console.log(friendNames)
        yield put(receiveQueryUser(friendNames.data?friendNames.data:[]));
    } catch (error) {
        console.log(error)
        yield put(receiveLogin(null));
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}

export function* watchRequestQueryUser() {
    while (true) {
        const {userName,friendName} = yield take(
            types.REQUEST_QUERY_USER
        );
        yield fork(
            requestQueryUser,
            userName,
            friendName
        );
    }
}