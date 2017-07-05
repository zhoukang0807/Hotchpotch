import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import { enterWebScoket } from '../../utils/RequestUtil';
import {  fetchChat,receiveChat } from '../../actions/chat/chat';
import { toastShort } from '../../utils/ToastUtil';
export function* requestChat(userId,userName) {
    try {
        yield put(fetchChat())
        const result =  yield call(enterWebScoket,userId,"admin",userName);
        console.log(result)
        yield put(receiveChat(result))
    } catch (error) {
        console.log(error)
        yield put(receiveChat(null));
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}

export function* watchRequestChat() {
    while (true) {
         const {userId,userName} = yield take(types.REQUEST_CHAT);
        yield fork(
            requestChat,
            userId,
            userName
        );
    }
}
