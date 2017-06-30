import {
    combineReducers
} from 'redux';
import read from './read';
import category from './category';
import routes from './routes';
import login from './login';
import register from './register';
import sendEmail from './sendEmail';
import  forgetPassword from './forgetPassword';
const rootReducer = combineReducers({
    routes,
    read,
    category,
    login,
    register,
    sendEmail,
    forgetPassword
});

export default rootReducer;