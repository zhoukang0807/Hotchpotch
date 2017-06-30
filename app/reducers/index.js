import {
    combineReducers
} from 'redux';
import read from './read';
import category from './category';
import routes from './routes';
import login from './login';
import register from './register';
import sendEmail from './sendEmail';
const rootReducer = combineReducers({
    routes,
    read,
    category,
    login,
    register,
    sendEmail
});

export default rootReducer;