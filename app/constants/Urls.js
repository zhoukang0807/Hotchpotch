const {ipSever} = require("./ipconfig")

export const WEXIN_ARTICLE_LIST =ipSever.server+'/articles/read';
export const WEXIN_ARTICLE_TYPE = 'http://route.showapi.com/582-1';
export const USER_LOGIN = ipSever.server+'/user/login';
export const USER_REGISTER =ipSever.server+'/user/register';
export const REQUSET_SENDEMAIL = ipSever.server+'/user/send/indentify';
export const REQUSET_FORGETPASSWORD = ipSever.server+'/user/forget/password';
export const REQUSET_ROOM_USERS = ipSever.server+'/room/select/users';
export const REQUSET_GET_CONTACTS = ipSever.server+'/contact/select';
export const REQUSET_GET_FIND = ipSever.server+'/find';

export const REQUSET_ADD_FRIEND = ipSever.server+'/contact/add';
export const UPLOAD_AVATAR = ipSever.server+'/user/update/avatar';