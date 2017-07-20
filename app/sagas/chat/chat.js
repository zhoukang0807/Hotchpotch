import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import { request } from '../../utils/RequestUtil';
import { CHAT_LIST } from '../../constants/Urls';
import {  fetchChat,receiveChat } from '../../actions/chat/chat';
import store from 'react-native-simple-store';
import { toastShort } from '../../utils/ToastUtil';
export function* requestChat(userName,friendName) {
    try {
        yield put(fetchChat())
        const chats = yield call(store.get, 'chats');
        if(chats){
            const chat = chats[userName][friendName].chats;
            yield put(receiveChat(chat))
        }else{
            yield put(receiveChat([]))
        }

    } catch (error) {
        console.log(error)
        yield put(receiveChat([]));
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}

export function* watchRequestChat() {
    while (true) {
        const {userName,friendName} = yield take(types.REQUEST_CHAT);
        yield fork(
            requestChat,
            userName,
            friendName
        );
    }
}
