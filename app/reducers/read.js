import * as types from '../constants/ActionTypes';

const initialState = {
  isRefreshing: false,
  loading: false,
  isLoadMore: false,
  noMore: false,
  articleList: {}
};

export default function read(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ARTICLE_LIST:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        loading: action.loading,
        isLoadMore: action.isLoadMore
      });
    case types.RECEIVE_ARTICLE_LIST:
      return Object.assign({}, state, {
        isRefreshing: false,
        isLoadMore: false,
        noMore: action.articleList.length === 0,
        articleList: state.isLoadMore
          ? loadMore(state, action)
          : combine(state, action),
        loading: state.articleList[action.typeId] === undefined
      });
    default:
      return state;
  }
}

function combine(state, action) {
  state.articleList[action.typeId] = action.articleList;
  return state.articleList;
}

function loadMore(state, action) {
    //concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。作用如更多
  state.articleList[action.typeId] = state.articleList[action.typeId].concat(
    action.articleList
  );
  return state.articleList;
}
