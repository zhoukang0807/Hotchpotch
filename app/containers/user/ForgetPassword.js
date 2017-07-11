import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as forgetPasswordCreators from '../../actions/user/forgetPassword';
import * as sendEmailCreators from '../../actions/sendEmail';

import ForgetPassword from '../../pages/user/ForgetPassword';

class ForgetPasswordContainer extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitleStyle:{alignSelf:'center'},
        headerTitle: '忘记密码',
    });
    render() {
        return <ForgetPassword {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const { forgetPassword,sendEmail} = state;
    return {
        forgetPassword,
        sendEmail
    };
};

const mapDispatchToProps = (dispatch) => {
    const forgetPasswordActions = bindActionCreators(forgetPasswordCreators, dispatch);
    const sendEmailActions = bindActionCreators(sendEmailCreators, dispatch);

    return {
        forgetPasswordActions,
        sendEmailActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordContainer);
//第一个（）是用来改变组件prop的方法，第二个（）是React组件，接受该组件的属性重绘