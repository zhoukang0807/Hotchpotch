
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
import * as registerCreators from '../actions/register';
import * as sendEmailCreators from '../actions/sendEmail';

import Register from '../pages/Register';

class RegisterContainer extends React.Component {
    render() {
        return <Register {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const { register } = state;
    return {
        register
    };
};

const mapDispatchToProps = (dispatch) => {
    const registerActions = bindActionCreators(registerCreators, dispatch);
    const sendEmailActions = bindActionCreators(sendEmailCreators, dispatch);

    return {
        registerActions,
        sendEmailActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
//第一个（）是用来改变组件prop的方法，第二个（）是React组件，接受该组件的属性重绘