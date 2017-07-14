import {
    combineReducers
} from 'redux';
import read from './read';
//import category from './category';
import routes from './routes';
import login from './user/login';
import register from './user/register';
import sendEmail from './sendEmail';
import  forgetPassword from './user/forgetPassword';
import  addFriend from './user/addFriend';
import  chat from './chat/chat';
import  newFriend from './chat/newFriend';
import  friend from './chat/friend';
const rootReducer = combineReducers({
    routes,
    read,
   // category,
    login,
    register,
    sendEmail,
    forgetPassword,
    friend,
    addFriend,
    newFriend,
    chat
});

export default rootReducer;