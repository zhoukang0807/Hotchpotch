import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import { request } from '../../utils/RequestUtil';
import { REQUSET_GET_CONTACTS } from '../../constants/Urls';
import { fetchContactList, receiveContactList } from '../../actions/chat/contact';
import store from 'react-native-simple-store';
import { toastShort } from '../../utils/ToastUtil';
export function* requestGetContacts(userId) {
    try {
        yield put(fetchContactList());
        const result = yield call(request,REQUSET_GET_CONTACTS+"?userId="+userId , 'get');
        console.log(result)
        if (result.resultCode != "0000") {
            yield put(receiveContactList([]));
            yield toastShort(result.resultDesc); //toastShort安卓内提示用。提示错误信息
        }else{
            yield put(receiveContactList(result.friends));
            yield call(store.save,'friends', result.friends); //将数据存储到store中
        }
    } catch (error) {
        console.log(error)
        yield put(receiveContactList([]));
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}

export function* watchRequsetContacts() {
    while (true) {
        const { userId } = yield take(
            types.REQUSET_CONTACT_LIST
        );
        yield fork(
            requestGetContacts,
            userId
        );
    }
}
