import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as findCreators from '../../actions/user/find';

import Find from '../../pages/user/find';

class FindPasswordContainer extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '搜索',
    });
    render() {
        return <Find {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const { find } = state;
    return {
        find,
    };
};

const mapDispatchToProps = (dispatch) => {
    const findActions = bindActionCreators(findCreators, dispatch);
    return {
        findActions,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPasswordContainer);
//第一个（）是用来改变组件prop的方法，第二个（）是React组件，接受该组件的属性重绘