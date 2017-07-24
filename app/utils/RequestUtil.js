import {toastShort} from './ToastUtil';
import store from 'react-native-simple-store';

const getUrl = (url) => {
    if (url.indexOf('?') === -1) {
        return `${url}?showapi_appid=29400&showapi_sign=e7977541307547beab3e4aa033adb78f`;
    }
    return `${url}&showapi_appid=29400&showapi_sign=e7977541307547beab3e4aa033adb78f`;
};

export const request = (url, method, body) => {
    let isOk;
    return new Promise((resolve, reject) => {
        fetch(getUrl(url), {
            method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body
        })
            .then((response) => {
                if (response.ok) {
                    isOk = true;
                } else {
                    isOk = false;
                }
                return response.json();
            })
            .then((responseData) => {
                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};


export default class SocketStore {
    socket: object;
    constructor() {
        const io = require('socket.io-client');
        //this.socket = io('http://169.254.173.140:3000');
        this.socket = io('http://103.74.175.131:3000');
        this.socket.on("connecting", function () {
            console.log("正在连接到服务器");
        })
        this.socket.on("connect", function () {
            console.log("连接成功");
        })
        this.socket.on("connect_failed", function () {
            console.log("连接失败");
        })
        this.socket.on("login", function (msg) {
            toastShort(msg);
        })
    }
}

export const uploadImage = (URL,image,userName) => {
    let formData = new FormData();
    let file = {uri: image.path, type: 'multipart/form-data', name:userName};
    formData.append("images",file);
    let isOk;
    return new Promise((resolve, reject) => {
        fetch(URL, {
            method:"POST",
            headers: {
                'Content-Type':'multipart/form-data',
            },
            body:formData
        })
            .then((response) => response.text() )
            .then((responseData)=>{
                resolve(responseData);
            })
            .catch((error)=>{  reject(error);});
    });
};



export const monitorMessage=(page,actions,event,arg)=> {
        global.socketStore.socket.on('message', function (chatInfo) {
            const friendUserName =chatInfo.user._id;
            var newMessages = []
            newMessages.push(chatInfo)
            store.get('newChat').then((newChat) => {
                if(!newChat){
                    newChat={}
                }
                if(newChat[friendUserName]){
                    newChat[friendUserName] = newChat[friendUserName]+1
                }else{
                    newChat[friendUserName] =1
                }
                store.save("newChat",newChat);
                store.get('loginInfo').then((loginInfo) => {
                    store.get('chats').then((chats) => {
                        if(chats){
                            if(chats[loginInfo.userName]){
                                if(chats[loginInfo.userName][friendUserName]&&chats[loginInfo.userName][friendUserName].length!=0){
                                    newMessages= newMessages.concat(chats[loginInfo.userName][friendUserName])
                                    chats[loginInfo.userName][friendUserName]=newMessages;
                                    store.save('chats',chats)
                                    console.log(chats);
                                }else{
                                    chats[loginInfo.userName][friendUserName]=[];
                                    chats[loginInfo.userName][friendUserName]=newMessages;
                                    store.save('chats',chats)
                                    console.log(chats);
                                }
                            }else{
                                chats[loginInfo.userName]={};
                                chats[loginInfo.userName][friendUserName]=[];
                                chats[loginInfo.userName][friendUserName]=newMessages;
                                store.save('chats',chats)
                                console.log(chats);
                            }
                        }else{
                            var newChats = {};
                            newChats[loginInfo.userName]={}
                            newChats[loginInfo.userName][friendUserName]=newMessages;
                            store.save('chats',newChats)
                            console.log(newChats);
                        }
                        if(page){
                            page.Setstate={ newChat:newChat}
                        }
                       if(actions){
                           actions[event](arg);
                       }
                    })
                })
            })
        })
}