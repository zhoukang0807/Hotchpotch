import React from 'react';
import {
    Provider
} from 'react-redux'; //Provider组件，可以让容器组件拿到state
import configureStore from './store/configure-store'; //存储
import App from './containers/app';

const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default Root;