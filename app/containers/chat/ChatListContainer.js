/**
 * Created by PC on 2017/6/28.
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatListCreators from '../../actions/chat/chatList';
import ChatList from '../../pages/chat/chatList';

class ChatListContainer extends React.Component {
    render() {
        return <ChatList {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const { chatList } = state;
    return {
        chatList
    };
};

const mapDispatchToProps = (dispatch) => {
    const chatListActions = bindActionCreators(chatListCreators, dispatch);
    return {
        chatListActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatListContainer);
//第一个（）是用来改变组件prop的方法，第二个（）是React组件，接受该组件的属性重绘