const {ipSever} = require("./ipconfig")

export const WEXIN_ARTICLE_LIST = 'http://169.254.116.144:8089/articles/read';
export const WEXIN_ARTICLE_TYPE = 'http://route.showapi.com/582-1';
export const USER_LOGIN = ipSever.server+'/user/login';
export const USER_REGISTER =ipSever.server+'/user/register';
export const REQUSET_SENDEMAIL = ipSever.server+'/user/send/indentify';

