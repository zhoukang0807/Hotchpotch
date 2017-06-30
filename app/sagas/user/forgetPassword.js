import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import { toastShort } from '../../utils/ToastUtil';
import { request } from '../../utils/RequestUtil';
import { REQUSET_FORGETPASSWORD } from '../../constants/Urls';
import store from 'react-native-simple-store';
import {receiveForgetPassword,fetchForgetPassword } from '../../actions/user/forgetPassword';
export function* requestForgetPassword(password,email,verifyCode) {
    try {
        yield put(fetchForgetPassword());
        const forgetInfo = yield call(request, REQUSET_FORGETPASSWORD, 'post', JSON.stringify({password, email,verifyCode}));
        console.log(forgetInfo)
        yield put(receiveForgetPassword(forgetInfo));
        yield call(store.save, 'registerInfo', forgetInfo);
        if (forgetInfo.resultCode == "0000") {
            yield toastShort("密码修改成功！");
        }else{
            yield toastShort(forgetInfo.resultDesc);
        }
    } catch (error) {
        console.log(error)
        yield put(receiveForgetPassword(null));
        yield toastShort(error);
    }
}
export function* watchRequestForgetPassword() {
    while (true) {
        const {password, email,verifyCode} = yield take(
            types.REQUEST_FORGETPASSWORD
        );
        yield fork(requestForgetPassword,password, email,verifyCode);
    }
}


