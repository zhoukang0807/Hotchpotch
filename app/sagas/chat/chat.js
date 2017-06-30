import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import { request,enterWebScoket } from '../../utils/RequestUtil';
import { USER_LOGIN } from '../../constants/Urls';
import {  fetchChat,receiveChat } from '../../actions/chat/chat';
import store from 'react-native-simple-store';
import { toastShort } from '../../utils/ToastUtil';
export function* requestChat(userName,password) {
    try {
    } catch (error) {
    }
}

export function* watchRequestChat() {
    while (true) {
        const {} = yield take(
            types.REQUEST_LOGIN
        );
        yield fork(
            requestChat
        );
    }
}
