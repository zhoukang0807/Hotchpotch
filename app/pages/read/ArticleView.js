/**
 * Created by PC on 2017/6/28.
 */
import React, {PropTypes} from 'react';
import {
    StyleSheet,
    ScrollView,
    Image,
    ListView,
    Text,
    Linking,
    View,
    RefreshControl,
    TouchableHighlight,
    TouchableOpacity,
    WebView,
    Dimensions,
    BackHandler
} from 'react-native';
import GridView from '../../components/GridView';
import { toastShort } from '../../utils/ToastUtil';
import Button from '../../components/Button';
import * as readActions from '../../actions/read'
import store from 'react-native-simple-store';
import {Actions} from 'react-native-router-flux';
const propTypes = {
    readActions: PropTypes.object,
    read: PropTypes.object.isRequired
};

const contextTypes = {
    routes: PropTypes.object.isRequired
};
//获取设备的宽度和高度
var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');
var articleUrl="http://www.baidu.com";
class ArticleView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Url: articleUrl
        };
        this.goBack = this.goBack.bind(this);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }
    componentWillMount() {
        store.get('articleUrl').then((url) =>{
            articleUrl=url
            this.setState({
                url
            });
        })
    }
    goBack(){}
    render() {
        return (
            <View style={styles.container}>
                <View >
                    <Text style={{color: 'black', textAlign: 'center', padding: 5, fontSize: 18}}>
                        新闻详情
                    </Text>
                </View>
                <View style={styles.container}>
                    <WebView bounces={true}
                             startInLoadingState={true}
                             domStorageEnabled={true}
                             javaScriptEnabled={true}
                             scalesPageToFit={true}
                             source={{uri:articleUrl}}
                             style={{width:deviceWidth, height:deviceHeight}}>
                    </WebView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    disclaimer: {
        fontSize: 14,
        textAlign: 'center'
    },

});
ArticleView.propTypes = propTypes;
ArticleView.contextTypes = contextTypes;
export default ArticleView;