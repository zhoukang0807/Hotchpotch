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
import {
	combineReducers
} from 'redux';
//Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
//Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

import read from './read';
import category from './category';
import routes from './routes';
//combineReducers 本函数可以帮助你组织多个 reducer，使它们分别管理自身相关联的 state。类似于 Flux 中的多个 store 分别管理不同的 state。
// 在 Redux 中，只有一个 store，但是 combineReducers 让你拥有多个 reducer，同时保持各自负责逻辑块的独立性。
const rootReducer = combineReducers({
	routes,
	read,
	category
});

export default rootReducer;