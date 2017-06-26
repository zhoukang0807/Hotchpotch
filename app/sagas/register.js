
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
import { USER_REGISTER } from '../constants/Urls';
import store from 'react-native-simple-store';
import {receiveRegister,fetchRegister } from '../actions/register';
export function* requestRegister(email,userName,password) {
    try {
        if(userName==""||password==""||email==""){
            yield toastShort("用户名、密码或邮箱不能为空!"); //toastShort安卓内提示用。提示错误信息
        }else {
            yield put(fetchRegister());
            const registerInfo = yield call(request, USER_REGISTER, 'post', JSON.stringify({email,userName, password}));
            console.log(registerInfo)
            yield put(receiveRegister(registerInfo));
            yield call(store.save, 'registerInfo', registerInfo); //将数据存储到store中
            if (registerInfo.resultCode == "0001") {
                yield toastShort(registerInfo.resultDesc); //toastShort安卓内提示用。提示错误信息
            }
        }
    } catch (error) {
        console.log(error)
        yield put(receiveRegister(null));
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}

export function* watchRequestRegister() {
    while (true) {
        const { email,userName, password} = yield take(
            types.REQUEST_REGISTER
        );
        yield fork(requestRegister,email,userName, password);
    }
}
