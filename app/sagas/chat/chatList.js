import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import { request } from '../../utils/RequestUtil';
import { FRIEND_LIST } from '../../constants/Urls';
import {  fetchChatList,receiveChatList } from '../../actions/chat/chatList';
import store from 'react-native-simple-store';
import { toastShort } from '../../utils/ToastUtil';


export function* requestChatList(userName) {
    try {
        yield put(fetchChatList())
        const chats = yield call(store.get, 'chats');
        if(chats){
            yield put(receiveChatList(chats[userName]?chats[userName]:{}))
        }else{
            yield put(receiveChatList({}));
        }
    } catch (error) {
        console.log(error)
        yield put(receiveChatList({}));
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}

export function* watchRequestChatList() {
    while (true) {
        const {userName} = yield take(types.REQUEST_CHAT_LIST);
        yield fork(
            requestChatList,
            userName
        );
    }
}

