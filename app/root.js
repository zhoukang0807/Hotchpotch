import React from 'react';
import {
    Provider
} from 'react-redux'; //Provider组件，可以让容器组件拿到state
import configureStore from './store/configure-store'; //存储
import App from './containers/app';
import rootSaga from './sagas/index';
const store = configureStore();  //创建一个store来存储数据 runSaga是store返回的一个属性调用sagaMiddleware.run。在中间介调用之后
store.runSaga(rootSaga);  //runSaga(iterator, {subscribe, dispatch, getState}, [monitor])
                          //允许在 Redux middleware 环境外部启动 sagas。当你想将 Saga 连接至外部的输入和输出（译注：即在外部执行 Saga）时，而不是 store 的 action，会很有用。
                         //runSaga 返回一个 Task 对象。就像 fork Effect 返回的。
const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);
//可以让下面的app等组件都拿到store方便更改状态
export default Root;