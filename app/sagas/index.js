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
import { watchRequestLogin } from './login';
import { watchRequestRegister} from './register';
import { watchRequestSendEmail} from './sendEmail';


export default function* rootSaga() {    //function* 这种声明方式(function关键字后跟一个星号）会定义一个生成器函数 (generator function)，它返回一个  Generator  对象。
                                            //生成器函数在执行时能中途退出，后面又能重新进入继续执行。而且在函数内定义的变量的状态都会保留，不受中途退出的影响。
    yield [ fork(watchRequestLogin),fork(watchRequestRegister),fork(watchRequestSendEmail),fork(watchRequestTypeList), fork(watchRequestArticleList)]; //目的是把所有的请求监听事件，用take监听某个事件
}


//yield 表达式
//由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。

//yield put({ type: 'CLICK_BTN' });作用和 redux 中的 dispatch 相同 //store.dispatch接受一个 Action 对象作为参数，将它发送出去。
//const id = yield select(state => state.id);作用和 redux thunk 中的 getState 相同。
//有阻塞地调用 saga 或者返回 promise 的函数。


// take 在这个例子中，先等待一个按钮点击的 action ，然后执行按钮点击的 saga：

// while (true) {
//     yield take('CLICK_BUTTON');
//     yield fork(clickButtonSaga);
// }

//在generator 函数中yield* foo(); 等同于 for (let v of foo()) {yield v;}  加*后面表示的是遍历器的对象 实际上，任何数据结构只要有 Iterator 接口，就可以被yield*遍历。 yield表达式返回整个字符串，yield*语句返回单个字符