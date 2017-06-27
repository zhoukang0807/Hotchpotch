import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import { toastShort } from '../utils/ToastUtil';
import { request } from '../utils/RequestUtil';
import { USER_REGISTER } from '../constants/Urls';
import store from 'react-native-simple-store';
import {receiveRegister,fetchRegister } from '../actions/register';
export function* requestRegister(email,userName,password) {
    try {
            yield put(fetchRegister());
            const registerInfo = yield call(request, USER_REGISTER, 'post', JSON.stringify({email,userName, password}));
            console.log(registerInfo)
            yield put(receiveRegister(registerInfo));
            yield call(store.save, 'registerInfo', registerInfo); //将数据存储到store中
            if (registerInfo.resultCode != "0000") {
                yield toastShort(registerInfo.resultDesc); //toastShort安卓内提示用。提示错误信息
            }
    } catch (error) {
        console.log(error)
        yield put(receiveRegister(null));
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}
export function* watchRequestRegister() {
    while (true) {
        const { email,userName, password} = yield take(
            types.REQUEST_REGISTER
        );
        yield fork(requestRegister,email,userName, password);
    }
}


