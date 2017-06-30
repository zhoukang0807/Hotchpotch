import * as types from '../../constants/ActionTypes';

export function requestArticleView(

) {
  return {
    type: types.REQUEST_ARTICLE_VIEW,

  };
}

export function fetchArticleView() {
  return {
    type: types.FETCH_ARTICLE_VIEW,

  };
}

export function receiveArticleView(article) {
  return {
    type: types.RECEIVE_ARTICLE_VIEW,
      article,

  };
}
