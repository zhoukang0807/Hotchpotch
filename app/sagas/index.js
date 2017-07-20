import { fork } from 'redux-saga/effects';
import { watchRequestQueryUser } from './user/addFriend';
import { watchRequestArticleList } from './read';
import { watchRequestLogin } from './user/login';
import { watchRequestRegister} from './user/register';
import { watchRequestSendEmail} from './sendEmail';
import { watchRequestForgetPassword} from './user/forgetPassword';
import { watchRequestFriend} from './chat/friend';
import { watchRequestChat} from './chat/chat';
import { watchRequestNewFriend} from './chat/newFriend';
import { watchRequestInfo} from './chat/info';
import { watchRequestChatList} from './chat/chatList';

export default function* rootSaga() {
    yield [ fork(watchRequestLogin),
             fork(watchRequestRegister),
             fork(watchRequestForgetPassword),
             fork(watchRequestSendEmail),
             fork(watchRequestQueryUser),
             fork(watchRequestArticleList),
             fork(watchRequestFriend),
            fork(watchRequestChat),
        fork(watchRequestNewFriend),
        fork(watchRequestInfo),
        fork(watchRequestChatList)


    ];
}

