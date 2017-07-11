import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatCreators from '../../actions/chat/chat';

import Chat from '../../pages/chat/chat';

class ChatContainer extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.sessionData.name,
    });
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
