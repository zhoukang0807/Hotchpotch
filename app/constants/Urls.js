const {ipSever} = require("./ipconfig")


export const UPLOAD_AVATAR = ipSever.server+'/user/update/avatar';
export const UPDATE = ipSever.server+'/user/update';
export const QUERY_USERINFO = ipSever.server+'/user/queryUserInfo';
export const QUERY_USERS = ipSever.server+'/user/queryFriend';
export const FRIEND_LIST =ipSever.server+'/user/selectFriend';
export const CHAT_LIST =ipSever.server+'/chat/selectChat';
export const WEXIN_ARTICLE_LIST =ipSever.server+'/articles/read';
export const WEXIN_ARTICLE_TYPE = 'http://route.showapi.com/582-1';
export const USER_LOGIN = ipSever.server+'/user/login';
export const USER_REGISTER =ipSever.server+'/user/register';
export const REQUSET_SENDEMAIL = ipSever.server+'/user/send/indentify';
export const REQUSET_FORGETPASSWORD = ipSever.server+'/user/forget/password';



