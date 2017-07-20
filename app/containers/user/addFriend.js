import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addFriendCreators from '../../actions/user/addFriend';

import AddFriend from '../../pages/user/AddFriend';

class addFriendContainer extends React.Component {
    render() {
        return <AddFriend {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const { addFriend } = state;
    return {
        addFriend
    };
};

const mapDispatchToProps = (dispatch) => {
    const addFriendActions = bindActionCreators(addFriendCreators, dispatch);
    return {
        addFriendActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(addFriendContainer);
