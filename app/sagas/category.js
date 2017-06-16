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
import store from 'react-native-simple-store';
import * as types from '../constants/ActionTypes';
import { toastShort } from '../utils/ToastUtil';
import { request } from '../utils/RequestUtil';
import { WEXIN_ARTICLE_TYPE } from '../constants/Urls';
import { fetchTypeList, receiveTypeList } from '../actions/category';

export function* requestTypeList() {
  try {
    yield put(fetchTypeList()); //fetchTypeList调用网络获取类别分类 receiveTypeList接受类别
    const typeList = yield call(request, WEXIN_ARTICLE_TYPE, 'get');  //此处为阻塞调用，调用完成后执行下面操作，获取数据后进行存储
      console.log(typeList)
    yield put(receiveTypeList(typeList.showapi_res_body.typeList));
    yield call(store.save, 'typeList', typeList.showapi_res_body.typeList); //将数据存储到store中
    const errorMessage = typeList.showapi_res_error;
    if (errorMessage && errorMessage !== '') {
      yield toastShort(errorMessage); //toastShort安卓内提示用。提示错误信息
    }
  } catch (error) {
    yield put(receiveTypeList([]));
    yield toastShort('网络发生错误，请重试');
  }
}

export function* watchRequestTypeList() {
  while (true) {
    yield take(types.REQUEST_TYPE_LIST);
    yield fork(requestTypeList);
  }
}
