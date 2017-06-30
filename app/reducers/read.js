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
      return Object.assign({}, state, {        //Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。复制的作用，避免指针问题

      });
    case types.RECEIVE_ARTICLE_LIST:
      return Object.assign({}, state, {
        success:true,
        articleList:action.read,
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
  state.articleList[action.typeId] = state.articleList[action.typeId].concat(  //concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。作用如更多
    action.articleList
  );
  return state.articleList;
}
