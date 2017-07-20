import {toastShort} from './ToastUtil';

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
