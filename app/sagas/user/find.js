import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import { request } from '../../utils/RequestUtil';
import { REQUSET_GET_FIND } from '../../constants/Urls';
import {  fetchFind,receiveFind } from '../../actions/user/find';
import { toastShort } from '../../utils/ToastUtil';
export function* requestFind(name,navigate) {
    try {
        yield put(fetchFind());
        const result = yield call(request, REQUSET_GET_FIND+"?name="+name, 'get');
        console.log(result)
        if (result.resultCode != "0000") {
            yield toastShort(result.resultDesc); //toastShort安卓内提示用。提示错误信息
            yield put(receiveFind(null));
        }else{
            yield put(receiveFind(result));
            navigate("FindResult",{result:result});
        }
    } catch (error) {
        console.log(error)
        yield put(receiveFind(null));
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}

export function* watchRequestFind() {
    while (true) {
        const { name,navigate } = yield take(
            types.REQUEST_FIND
        );
        yield fork(
            requestFind,
            name,
            navigate
        );
    }
}
