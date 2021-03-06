import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import { toastShort } from '../../utils/ToastUtil';
import { request } from '../../utils/RequestUtil';
import { USER_REGISTER } from '../../constants/Urls';
import store from 'react-native-simple-store';
import {receiveRegister,fetchRegister } from '../../actions/user/register';
export function* requestRegister(userName,password,email,verifyCode,nick) {
    try {
            yield put(fetchRegister());
            const registerInfo = yield call(request, USER_REGISTER, 'post', JSON.stringify({userName,password, email,verifyCode,nick}));
            console.log(registerInfo)
            yield put(receiveRegister(registerInfo));
            if (registerInfo.resultCode == "0000") {
                yield toastShort("用户注册成功");
            }else{
                yield toastShort(registerInfo.resultDesc);
            }
    } catch (error) {
        console.log(error)
        yield put(receiveRegister(null));
        yield toastShort(error);
    }
}
export function* watchRequestRegister() {
    while (true) {
        const { userName,password, email,verifyCode,nick} = yield take(
            types.REQUEST_REGISTER
        );
        yield fork(requestRegister,userName,password, email,verifyCode,nick);
    }
}


