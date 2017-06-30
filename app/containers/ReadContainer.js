/**
 * Created by PC on 2017/6/28.
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as readCreators from '../actions/read';

import Read from '../pages/Read';

class ReadContainer extends React.Component {
    render() {
        return <Read {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const { read } = state;
    return {
        read
    };
};

const mapDispatchToProps = (dispatch) => {
    const readActions = bindActionCreators(readCreators, dispatch);
    return {
        readActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadContainer);
//第一个（）是用来改变组件prop的方法，第二个（）是React组件，接受该组件的属性重绘