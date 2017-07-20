/**
 * Created by PC on 2017/6/28.
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as newFriendCreators from '../../actions/chat/newFriend';
import NewFriend from '../../pages/chat/newFriend';

class NewFriendContainer extends React.Component {
    render() {
        return <NewFriend {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const { newFriends } = state;
    return {
        newFriends
    };
};

const mapDispatchToProps = (dispatch) => {
    const newFriendActions = bindActionCreators(newFriendCreators, dispatch);
    return {
        newFriendActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFriendContainer);
//第一个（）是用来改变组件prop的方法，第二个（）是React组件，接受该组件的属性重绘