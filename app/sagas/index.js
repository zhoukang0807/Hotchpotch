import { fork } from 'redux-saga/effects';
import { watchRequestTypeList } from './category';
import { watchRequestArticleList } from './read';
import { watchRequestLogin } from './login';
import { watchRequestRegister} from './register';
import { watchRequestSendEmail} from './sendEmail';
import { watchRequestForgetPassword} from './forgetPassword';


export default function* rootSaga() {
    yield [ fork(watchRequestLogin),
             fork(watchRequestRegister),
             fork(watchRequestForgetPassword),
             fork(watchRequestSendEmail),
             fork(watchRequestTypeList),
             fork(watchRequestArticleList)];
}

