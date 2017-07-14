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
import store from 'react-native-simple-store';
var articleUrl = "http://www.baidu.com";
class ArticleView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Url: articleUrl
        };

    }

    componentWillMount() {
        store.get('articleUrl').then((url) => {
            articleUrl = url
            // toastShort(articleUrl);
            this.setState({
                url
            });
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView bounces={false}
                         scalesPageToFit={true}
                         source={{uri: articleUrl, method: 'GET'}}
                       >
                </WebView>
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
export default ArticleView;