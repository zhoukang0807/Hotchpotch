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
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginCreators from '../actions/login';

import Login from '../pages/Login';

class LoginContainer extends React.Component {
    render() {
        return <Login {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const { login } = state;
    return {
        login
    };
};

const mapDispatchToProps = (dispatch) => {
    const loginActions = bindActionCreators(loginCreators, dispatch);
    return {
        loginActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
//第一个（）是用来改变组件prop的方法，第二个（）是React组件，接受该组件的属性重绘