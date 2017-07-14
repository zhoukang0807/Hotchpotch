import React, {PropTypes} from 'react';
import {
    InteractionManager,
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    TextInput,
    BackHandler,
    Dimensions
} from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import FetchLoading from '../components/fetchLoading';
import {toastShort} from '../utils/ToastUtil';
import NavigationUtil from '../utils/NavigationUtil';

class About extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '我',
        tabBarLabel: '我',
        tabBarIcon: ({tintColor}) => (
            <Icon name="md-person" size={25} color={tintColor} />
        ),
    });

    constructor(props) {
        super(props);
        this.state = {
            loginInfo:{}
        };
        this.onloginOut=this.onloginOut.bind(this);
    }

//组件出现前 就是dom还没有渲染到html文档里面
    componentWillMount() {

    }

//组件渲染完成 已经出现在dom文档里
    componentDidMount() {
        store.get('loginInfo').then((loginInfo) => {
            this.setState({loginInfo:loginInfo});
        });
    }

    //官方的解释是组件被移除前执行
    componentWillUnmount() {

    }

    goBack() {

    }

    onloginOut() {
            store.delete("loginInfo")
            NavigationUtil.reset(this.props.navigation, 'Login');
    }

    render() {
        const {loginInfo} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.rowView}>
                    <Image style={styles.image} source={{uri: "https://facebook.github.io/react/img/logo_og.png"}}/>
                    <View style={styles.textView}>
                        <Text
                            style={styles.text1}>昵称汕尾填写</Text>
                        <Text style={styles.text}>账号：{loginInfo.userName}</Text>
                    </View>
                </View>
                <View style={styles.rowView2}>
                    <Text style={styles.text2}>个人签名:</Text>
                    <Text style={styles.text}>{loginInfo.sign}</Text>
                </View>
                <Button
                    containerStyle={styles.sureBtn}
                    style={styles.btnText}
                    text={'退出登录'}
                    onPress={() => this.onloginOut()}
                />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowView: {
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: "#FFF"
    },
    rowView2: {
        marginTop: 20,
        paddingLeft: 10,
        flexDirection: 'row',
        backgroundColor: "#FFF"
    },
    image: {
        width: 60,
        height: 60,
        margin: 10,
        borderRadius: 8
    },
    textView: {
        margin: 10,
        left: 20,
    },
    text1: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    text2: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 14
    },
    sureBtn: {
        margin: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fe2f11'
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    },
});

export default About;
