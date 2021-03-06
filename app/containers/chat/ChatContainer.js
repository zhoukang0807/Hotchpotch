/**
 * Created by PC on 2017/6/28.
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatCreators from '../../actions/chat/chat';
import Chat from '../../pages/chat/chat';

class ChatContainer extends React.Component {
    render() {
        return <Chat {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const { chat } = state;
    return {
        chat
    };
};

const mapDispatchToProps = (dispatch) => {
    const chatActions = bindActionCreators(chatCreators, dispatch);
    return {
        chatActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
//第一个（）是用来改变组件prop的方法，第二个（）是React组件，接受该组件的属性重绘