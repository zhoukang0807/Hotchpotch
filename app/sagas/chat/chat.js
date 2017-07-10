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
        const chat = chats[userName][friendName].chats;
        if(chat){
            yield put(receiveChat(chat))
        }else{
            const chat = yield call(request,CHAT_LIST,'post',JSON.stringify({userName, friendName}));
            yield put(receiveChat(chat))
            const chats ={}
            chats[userName]={};
            chats[userName][friendName]={}
            chats[userName][friendName].chat = chat
            yield call(store.save, 'chats',chats); //将数据存储到store中
        }
        //将数据存储到store中

    } catch (error) {
        console.log(error)
        yield put(receiveChat(null));
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
