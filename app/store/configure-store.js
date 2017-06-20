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
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from '../reducers/index';

const middlewares = [];
const { logger } = require('redux-logger');

// configuring saga middleware
const sagaMiddleware = createSagaMiddleware(); //创建一个 Redux 中间件，将 Sagas 与 Redux Store 建立连接。

middlewares.push(sagaMiddleware);
/* global __DEV__  */
if (__DEV__) {
  middlewares.push(logger);
} //中间介组成一个调用链
//整个applyMiddleware方法就是返回了一个方法，根据applyMiddleware方法的使用，我们可以知道next就是createStore方法，
//http://www.tuicool.com/articles/u6JRjyz   这是对applyMiddleware方法的解释
//因为最终我们要返回的是一个装饰过的createStore方法，那么接收的参数肯定是不会变，所以最终我们调用createStoreWithMiddleware方法其实就是调用
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore); //...既吧数组遍历后作为参数传给applyMiddleware(middlewares[0],middlewares[1])  //createStore是回调返回对应的函数
//在JavaScript ES6中，export与export default均可用于导出常量、函数、文件、模块等，你可以在其它文件或模块中通过import+(常量
//| 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用，但在一个文件或模块中，export、import可以有多个，export default仅有一个。导出的方法导入时import str from 'demo1' //导入的时候没有花括号
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  // install saga run
  store.runSaga = sagaMiddleware.run; //动态执行 saga。用于 applyMiddleware 阶段之后执行 Sagas。
  store.close = () => store.dispatch(END);//等同于 store.close=function(){ store.dispatch(END)} ，调用close时候发送END

  return store;
}
