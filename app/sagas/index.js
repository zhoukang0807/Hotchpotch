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
import { fork } from 'redux-saga/effects'; //redux-saga 可以用 fork 和 call 来调用子 saga ，其中 fork 是无阻塞型调用，call 是阻塞型调用。
import { watchRequestTypeList } from './category';
import { watchRequestArticleList } from './read';

export default function* rootSaga() {
    yield [fork(watchRequestTypeList), fork(watchRequestArticleList)];
}

//yield put({ type: 'CLICK_BTN' });作用和 redux 中的 dispatch 相同 //store.dispatch接受一个 Action 对象作为参数，将它发送出去。
//const id = yield select(state => state.id);作用和 redux thunk 中的 getState 相同。
//有阻塞地调用 saga 或者返回 promise 的函数。


// take 在这个例子中，先等待一个按钮点击的 action ，然后执行按钮点击的 saga：

// while (true) {
//     yield take('CLICK_BUTTON');
//     yield fork(clickButtonSaga);
// }