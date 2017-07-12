/**
 * Created by PC on 2017/6/28.
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleCreators from '../../actions/read/articleView';

import ArticleView from '../../pages/read/ArticleView';

class ArticleViewContainer extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.rowData.title,
        headerTitleStyle: {
            fontSize: 14,
        },
    });
    render() {
        return <ArticleView {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const { read } = state;
    return {
        read
    };
};

const mapDispatchToProps = (dispatch) => {
    const articleActions = bindActionCreators(articleCreators, dispatch);
    return {
        articleActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleViewContainer);
//第一个（）是用来改变组件prop的方法，第二个（）是React组件，接受该组件的属性重绘