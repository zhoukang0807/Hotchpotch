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
import Button from '../../components/Button';
import FetchLoading from '../../components/fetchLoading';
import {toastShort} from '../../utils/ToastUtil';


class ContactInfo extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '详细信息',
    });

    constructor(props) {
        super(props);
        this.state = {};
    }

//组件出现前 就是dom还没有渲染到html文档里面
    componentWillMount() {
    }

//组件渲染完成 已经出现在dom文档里
    componentDidMount() {
    }

    //官方的解释是组件被移除前执行
    componentWillUnmount() {
    }

    goBack() {

    }

    onClickChat() {
        const {contactInfo} = this.props.navigation.state.params;
        const {navigate} = this.props.navigation;
        store.get('loginInfo').then((loginInfo) => {
            navigate('Chat', {loginInfo: loginInfo, sessionData: contactInfo});
        });
    }

    render() {
        const {contactInfo} = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <View style={styles.rowView}>
                    <Image style={styles.image} source={{uri: "https://facebook.github.io/react/img/logo_og.png"}}/>
                    <View style={styles.textView}>
                        <Text
                            style={styles.text1}>{contactInfo.remark ? contactInfo.remark : contactInfo.nickName}</Text>
                        <Text style={styles.text}>账号：{contactInfo.userName}</Text>
                        <Text style={styles.text}>{contactInfo.remark ? "昵称：" + contactInfo.nickName : ""}</Text>
                    </View>
                </View>
                <View style={styles.rowView2}>
                    <Text style={styles.text2}>个人签名:</Text>
                    <Text style={styles.text}>{contactInfo.sign}</Text>
                </View>
                <Button
                    containerStyle={styles.sureBtn}
                    style={styles.btnText}
                    text={'发消息'}
                    onPress={() => this.onClickChat()}
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
        height:50,
        marginTop: 20,
        paddingLeft: 10,
        flexDirection: 'row',
        backgroundColor: "#FFF",
        alignItems: 'center',
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
        backgroundColor: '#76be98'
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    },
});

export default ContactInfo;
