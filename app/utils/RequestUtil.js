import Pomelo from 'react-native-pomelo';
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

export const enterWebScoket = (uid = "", rid = "", username = "") => {
    return new Promise((resolve, reject) => {
        Pomelo.init({
            host: "169.254.108.40",
            port: 3014,
            log: true
        }, function () {
            Pomelo.request('gate.gateHandler.queryEntry', {
                uid: uid
            }, function (data) {
                Pomelo.disconnect();
                if(data.code === 500) {
                    reject("服务连接失败！");
                }
                Pomelo.init({
                    host: data.host,
                    port: data.port,
                    log: true
                }, function () {
                    Pomelo.request("connector.entryHandler.enter", {
                        username: username,
                        rid: rid
                    }, function (users) {
                        if(users.error) {
                            reject("服务连接失败！");
                        }else{
                            resolve(users);
                        }
                    });
                });
            });
        });
    });
};

