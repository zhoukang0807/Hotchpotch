import { put, take, call, fork } from 'redux-saga/effects';

import * as types from '../constants/ActionTypes';
import { toastShort } from '../utils/ToastUtil';
import { request } from '../utils/RequestUtil';
import { WEXIN_ARTICLE_LIST } from '../constants/Urls';
import { fetchArticleList, receiveArticleList } from '../actions/read';
import store from 'react-native-simple-store';
export function* requestArticleList(page) {
    try {
        yield put(fetchArticleList());
        const read = yield call(request,WEXIN_ARTICLE_LIST, 'post',JSON.stringify({ page}));
        yield put(
            receiveArticleList(read.list)
        );
        if (read.resultCode != "0000") {
            yield toastShort(read.resultDesc); //toastShort安卓内提示用。提示错误信息
        }
    } catch (error) {
        yield put(receiveArticleList([]));
        toastShort(error);
    }
}

export function* watchRequestArticleList() {
    while (true) {
        const {page} = yield take(types.REQUEST_ARTICLE_LIST);
        yield fork(requestArticleList,page);
    }
}