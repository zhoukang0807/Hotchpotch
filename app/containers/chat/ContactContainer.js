import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contactCreators from '../../actions/chat/contact';
import Icon from 'react-native-vector-icons/Ionicons';
import Contact from '../../pages/chat/contact';

class ContactContainer extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: "联系人",
        tabBarLabel: '联系人',
        tabBarIcon: ({tintColor}) => (
            <Icon name="md-contacts" size={25} color={tintColor} />
        ),
    });
    render() {
        return <Contact {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const { contact } = state;
    return {
        contact
    };
};

const mapDispatchToProps = (dispatch) => {
    const contactActions = bindActionCreators(contactCreators, dispatch);
    return {
        contactActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer);
