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
