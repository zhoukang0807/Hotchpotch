import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import {fetchSendEmail,receiveSendEmail } from '../actions/sendEmail';
import { REQUSET_SENDEMAIL } from '../constants/Urls';
import { toastShort } from '../utils/ToastUtil';
import { request } from '../utils/RequestUtil';
import store from 'react-native-simple-store';
export function* requestSendEmail(email,shouldStartCountting) {
    try {
            yield put(fetchSendEmail());
            const result = yield call(request, REQUSET_SENDEMAIL, 'post', JSON.stringify({email}));
            console.log(result)
            yield put(receiveSendEmail(result.code));
            yield call(store.save, 'code', result.code); //将数据存储到store中
            if (result.resultCode != "0000") {
                shouldStartCountting(false);
                yield toastShort(registerInfo.resultDesc); //toastShort安卓内提示用。提示错误信息
            }else{
                shouldStartCountting(true);
                yield toastShort("验证码已发送"); //toastShort安卓内提示用。提示错误信息
            }
    } catch (error) {
        console.log(error)
        yield put(receiveSendEmail(null));
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}

export function* watchRequestSendEmail() {
    while (true) {
        const { email,shouldStartCountting} = yield take(
            types.REQUEST_SENDEMAIL
        );
        yield fork(requestSendEmail,email,shouldStartCountting);
    }
}
