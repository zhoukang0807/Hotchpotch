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
    Dimensions
} from 'react-native';
import GridView from '../../components/GridView';
import { toastShort } from '../../utils/ToastUtil';
import Button from '../../components/Button';
import * as readActions from '../../actions/read'
import store from 'react-native-simple-store';
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

    }
    componentWillMount() {
        store.get('articleUrl').then((url) =>{
            articleUrl=url
           // toastShort(articleUrl);
            this.setState({
                url
            });
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text
                        style={[
                            styles.btnText,
                            {color: 'black', textAlign: 'center', padding: 5, fontSize: 18}
                        ]}
                    >
                    </Text>
                </View>
                <View style={styles.container}>
                    <WebView bounces={false}
                             scalesPageToFit={true}
                             source={{uri:articleUrl,method:'GET'}}
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