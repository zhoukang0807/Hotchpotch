import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginCreators from '../../actions/user/login';

import Login from '../../pages/user/Login';

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
