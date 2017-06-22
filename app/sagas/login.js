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

export function* requestLogin(userName,password) {
    try {
        console.log(userName)
        console.log(password)
        yield put(fetchLogin());
        const loginfo = yield call(request, USER_LOGIN, 'post',JSON.stringify({userName,password}));
        console.log(loginfo)
        console.log("进入登陆界面！")
    } catch (error) {
        console.log("登陆出错！")
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
