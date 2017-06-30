/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { put, take, call, fork } from 'redux-saga/effects';

import * as types from '../constants/ActionTypes';
import { toastShort } from '../utils/ToastUtil';
import { request } from '../utils/RequestUtil';
import { WEXIN_ARTICLE_LIST } from '../constants/Urls';
import { fetchArticleList, receiveArticleList } from '../actions/read';
import store from 'react-native-simple-store';
export function* requestArticleList() {
  try {
    yield put(fetchArticleList());
    const read = yield call(
      request,
        WEXIN_ARTICLE_LIST,
      'get'
    );
    yield put(
      receiveArticleList(
          read.list,

      )
    );
      yield call(store.save, 'read', read); //将数据存储到store中
    const resultCode = read.resultCode;
      if (resultCode != "0000") {
          yield toastShort(read.resultDesc); //toastShort安卓内提示用。提示错误信息
      }
  } catch (error) {
    yield put(receiveArticleList([]));
    toastShort('网络发生错误，请重试');
  }
}

export function* watchRequestArticleList() {
    while (true) {
        yield take(types.REQUEST_ARTICLE_LIST);
        yield fork(requestArticleList);
    }

}
