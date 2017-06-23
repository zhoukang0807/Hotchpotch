
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
export function* requestRegister(userName,password) {
    try {
        console.log('123')
    } catch (error) {
        console.log(error)
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}

export function* watchRequestRegister() {
    while (true) {
        yield take(types.REQUEST_REGISTER);
        yield fork(requestRegister,);
    }
}
