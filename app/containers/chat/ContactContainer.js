import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contactCreators from '../../actions/chat/contact';
import Contact from '../../pages/chat/contact';
import Example from '../../components/Example';
import Icon from 'react-native-vector-icons/Ionicons';
class ContactContainer extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: "联系人",
        tabBarLabel: '联系人',
        tabBarIcon: ({tintColor}) => (
            <Icon name="md-contacts" size={25} color={tintColor} />
        ),
        headerRight:<Example/>
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
