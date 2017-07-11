import { fork } from 'redux-saga/effects';
import { watchRequestArticleList } from './read';
import { watchRequestLogin } from './user/login';
import { watchRequestRegister} from './user/register';
import { watchRequestSendEmail} from './sendEmail';
import { watchRequestForgetPassword} from './user/forgetPassword';
import { watchRequsetUsers} from './chat/chat';


export default function* rootSaga() {
    yield [ fork(watchRequestLogin),
             fork(watchRequestRegister),
             fork(watchRequestForgetPassword),
             fork(watchRequestSendEmail),
             fork(watchRequestArticleList),
             fork(watchRequsetUsers),
          ];
}

