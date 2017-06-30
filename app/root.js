import React from 'react';
import {
    Provider
} from 'react-redux';
import configureStore from './store/configure-store';
import App from './containers/app';
import rootSaga from './sagas/index';
const store = configureStore();
store.runSaga(rootSaga);
const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default Root;