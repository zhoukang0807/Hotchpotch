import {
    combineReducers
} from 'redux';
import read from './read';
import category from './category';
import routes from './routes';
import login from './user/login';
import register from './user/register';
import sendEmail from './sendEmail';
import  forgetPassword from './user/forgetPassword';
import  chat from './chat/chat';
import  contact from './chat/contact';
import  find from './user/find';


const rootReducer = combineReducers({
    routes,
    read,
    category,
    login,
    register,
    sendEmail,
    forgetPassword,
    chat,
    contact,
    find
});

export default rootReducer;