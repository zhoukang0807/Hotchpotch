/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const {ipSever} = require("./ipconfig")

export const WEXIN_ARTICLE_LIST = 'http://169.254.116.144:8089/articles/read';
export const WEXIN_ARTICLE_TYPE = 'http://route.showapi.com/582-1';
export const USER_LOGIN = ipSever.server+'/user/login';
export const USER_REGISTER =ipSever.server+'/user/register';
export const REQUSET_SENDEMAIL = ipSever.server+'/user/send/indentify';

