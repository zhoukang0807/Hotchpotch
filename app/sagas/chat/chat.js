import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import { request,enterWebScoket } from '../../utils/RequestUtil';
import { USER_LOGIN } from '../../constants/Urls';
import {  fetchChat,receiveChat } from '../../actions/chat/chat';
import store from 'react-native-simple-store';
import { toastShort } from '../../utils/ToastUtil';
export function* requestChat(userId,userName) {
    try {
        yield put(fetchChat())
        const users =  yield call(enterWebScoket,userId,"admin",userName); 
        console.log(users)
        yield put(receiveChat(users))
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
