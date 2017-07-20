import * as types from '../constants/ActionTypes';

export function requestArticleList(page) {
    return {
        type: types.REQUEST_ARTICLE_LIST,
        page
    };
}

export function fetchArticleList() {
    return {
        type: types.FETCH_ARTICLE_LIST,
    };
}

export function receiveArticleList(read) {
    return {
        type: types.RECEIVE_ARTICLE_LIST,
        read,

    };
}