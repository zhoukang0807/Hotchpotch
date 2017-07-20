/**
 * Created by PC on 2017/6/28.
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as infoCreators from '../../actions/chat/info';

import Info from '../../pages/chat/info';

class InfoContainer extends React.Component {
    render() {
        return <Info {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const { info } = state;
    return {
        info
    };
};

const mapDispatchToProps = (dispatch) => {
    const infoActions = bindActionCreators(infoCreators, dispatch);
    return {
        infoActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer);
//第一个（）是用来改变组件prop的方法，第二个（）是React组件，接受该组件的属性重绘