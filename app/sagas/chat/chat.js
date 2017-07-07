import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import { request } from '../../utils/RequestUtil';
import { REQUSET_ROOM_USERS } from '../../constants/Urls';
import {  receiveUserList } from '../../actions/chat/chat';
import store from 'react-native-simple-store';
import { toastShort } from '../../utils/ToastUtil';
export function* requestGetUsers(id) {
    try {
        const result = yield call(request,REQUSET_ROOM_USERS+"?id="+id , 'get');
        console.log(result)
        yield put(receiveUserList(result.users));
        let users = yield call(store.get,'users'); //将数据存储到store中
        if(!users){
            users={};
            users[id]=[];
        }

        if (result.resultCode != "0000") {
            yield toastShort(result.resultDesc); //toastShort安卓内提示用。提示错误信息
        }else{
            users[id] = result.users;
            yield call(store.save,'users', users); //将数据存储到store中
        }
    } catch (error) {
        console.log(error)
        yield put(receiveUserList([]));
        yield toastShort(error); //toastShort安卓内提示用。提示错误信息
    }
}

export function* watchRequsetUsers() {
    while (true) {
        const { id} = yield take(
            types.REQUSET_USERLIST
        );
        yield fork(
            requestGetUsers,
            id
        );
    }
}
