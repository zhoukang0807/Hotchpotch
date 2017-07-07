import Pomelo from 'react-native-pomelo';
import {ipSever} from '../constants/ipconfig';
export const request = (url, method, body) => {
    let isOk;
    return new Promise((resolve, reject) => {
        fetch(url, {
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

export const enterWebScoket = (uid="",rid = "", username = "") => {
    return new Promise((resolve, reject) => {
                Pomelo.init({
                    host:ipSever.socketIp,
                    port:3050,
                    log: true
                }, function () {
                    Pomelo.request("connector.entryHandler.enter", {
                        username: username,
                        rid: rid,
                        uid:uid
                    }, function (users) {
                        if(users.error) {
                            reject("服务连接失败！");
                        }else{
                            resolve(users);
                        }
                    });
                });
    });
};

