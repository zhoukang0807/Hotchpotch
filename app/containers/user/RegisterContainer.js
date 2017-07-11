import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as registerCreators from '../../actions/user/register';
import * as sendEmailCreators from '../../actions/sendEmail';

import Register from '../../pages/user/Register';

class RegisterContainer extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: '邮箱注册',
    });
    render() {
        return <Register {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const { register,sendEmail} = state;
    return {
        register,
        sendEmail
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