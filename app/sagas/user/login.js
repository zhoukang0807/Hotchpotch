import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import { request,scoketio } from '../../utils/RequestUtil';
import { USER_LOGIN } from '../../constants/Urls';
import {  fetchLogin,receiveLogin } from '../../actions/user/login';
import store from 'react-native-simple-store';
import { toastShort } from '../../utils/ToastUtil';
export function* requestLogin(userName,password) {
    try {
            yield put(fetchLogin());
            const result = yield call(request, USER_LOGIN, 'post', JSON.stringify({userName, password}));
            console.log(result)
            yield put(receiveLogin(result.loginInfo));
            yield call(store.save, 'loginInfo', result.loginInfo); //将数据存储到store中
            if (result.resultCode != "0000") {
                yield toastShort(result.resultDesc); //toastShort安卓内提示用。提示错误信息
            }
        yield call(loginSocket,userName);
    } catch (error) {
        console.log(error)
        yield put(receiveLogin(null));
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}

export function* watchRequestLogin() {
    while (true) {
        const { userName, password} = yield take(
            types.REQUEST_LOGIN
        );
        yield fork(
            requestLogin,
            userName,
            password
        );
    }
}

function loginSocket(username) {
    global.socketStore.socket.emit('login', {userName: username});
}