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


class BlogView extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '作者的博客',
    });
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentWillMount() {
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
                             source={{uri:"http://kangzw.com",method:'GET'}}
                            >
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
export default BlogView;