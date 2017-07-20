/**
 * Created by PC on 2017/6/28.
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as friendCreators from '../../actions/chat/friend';

import Friend from '../../pages/chat/friend';

class FriendContainer extends React.Component {
    render() {
        return <Friend {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const { friend } = state;
    return {
        friend
    };
};

const mapDispatchToProps = (dispatch) => {
    const friendActions = bindActionCreators(friendCreators, dispatch);
    return {
        friendActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendContainer);
//第一个（）是用来改变组件prop的方法，第二个（）是React组件，接受该组件的属性重绘