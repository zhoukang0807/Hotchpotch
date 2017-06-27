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
import { request } from '../utils/RequestUtil';
import { USER_LOGIN } from '../constants/Urls';
import {  fetchLogin,receiveLogin } from '../actions/login';
import store from 'react-native-simple-store';
import { toastShort } from '../utils/ToastUtil';
export function* requestLogin(userName,password) {
    try {
        if(userName==""||password==""){
            yield toastShort("用户名或密码不能为空!"); //toastShort安卓内提示用。提示错误信息
        }else {
            yield put(fetchLogin());
            const loginInfo = yield call(request, USER_LOGIN, 'post', JSON.stringify({userName, password}));
            console.log(loginInfo)
            yield put(receiveLogin(loginInfo));
            yield call(store.save, 'loginInfo', loginInfo); //将数据存储到store中
            if (loginInfo.resultCode != "0000") {
                yield toastShort(loginInfo.resultDesc); //toastShort安卓内提示用。提示错误信息
            }
        }
    } catch (error) {
        console.log(error)
        yield put(receiveLogin(null));
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}

export function* watchRequestLogin() {
    while (true) {
        const { userName, password} = yield take(
            types.REQUEST_LOGIN
        );
        yield fork(
            requestLogin,
            userName,
            password
        );
    }
}
