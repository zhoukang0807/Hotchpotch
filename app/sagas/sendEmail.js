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
            if (result.resultCode != "0000") {
                shouldStartCountting(false);
                yield toastShort(result.resultDesc);
            }else{
                shouldStartCountting(true);
                yield call(store.save, 'code', result.code);
                yield toastShort("验证码已发送");
            }
    } catch (error) {
        console.log(error)
        yield put(receiveSendEmail(null));
        shouldStartCountting(false);
        yield toastShort(error);
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
