import * as types from '../constants/ActionTypes';

export function requestSendEmail(
    email,
    shouldStartCountting
) {
  return {
    type: types.REQUEST_SENDEMAIL,
      email,
      shouldStartCountting
  };
}

export function fetchSendEmail() {
    return {
        type: types.FETCH_SENDEMAIL,
    };
}

export function receiveSendEmail(
    code
) {
    return {
        type: types.REQUEST_SENDEMAIL,
        code
    };
}