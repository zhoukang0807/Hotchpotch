import React, { PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    BackHandler,
} from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import FetchLoading from '../../components/fetchLoading';
import { toastShort } from '../../utils/ToastUtil';

import {
    Actions
} from 'react-native-router-flux';

const contextTypes = {
    routes: PropTypes.object.isRequired
};

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        const { infoActions ,userName} = this.props;
        infoActions.requestInfo(userName);
    }
    goBack(){}

    componentDidMount() {
        setTimeout(()=> {
            Actions.refresh({
                title:"详细信息",
                titleStyle: {color: '#fff', fontSize: 20},
                navigationBarStyle: {backgroundColor: "#340F19"}
            });
        }, 10)
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }

    render() {
        const {info} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.rowView}>
                    <Image style={styles.image} source={{uri: info.info.avatar}}/>
                    <View style={styles.textView}>
                        <Text style={styles.text}>账号：{info.info.userName}</Text>
                        <Text style={styles.text}>昵称: {info.info.nick}</Text>
                    </View>
                </View>
                <View style={styles.rowView1}>
                    <Text style={styles.text1}>朋友圈位置(未开发)</Text>
                </View>
                <View style={styles.rowView2}>
                    <Text style={styles.text2}>个人签名:</Text>
                    <Text style={styles.text}>{info.info.sign}</Text>
                </View>
                <Button children="发消息"
                        onPress={()=>{this.privateChat()}}
                />
            </View>
        )
    }
    privateChat(){
        const { routes } = this.context;
        const { loginInfo,info } = this.props;
        const chatInfo = {
            friend:info.info,
            loginInfo:loginInfo
        }
        routes.ChatContainer(chatInfo);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowView: {
        marginTop: 5,
        flexDirection: 'row',
        backgroundColor: "#FFF"
    },
    rowView1: {
        height:80,
        margin: 5,
        paddingLeft: 10,
        flexDirection: 'row',
        backgroundColor: "#FFF",
        alignItems: 'center',
        borderWidth:1,
        borderRadius:5
    },
    rowView2: {
        height:50,
        marginTop: 5,
        paddingLeft: 10,
        flexDirection: 'row',
        backgroundColor: "#FFF",
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        marginTop: 10,
        marginLeft: 5,
        marginBottom:5,
        borderRadius: 8
    },
    textView: {
        marginTop: 10,
        marginBottom:5,
        marginRight:5,
        left: 20,
    },
    text1: {
        fontSize: 20
    },
    text2: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 18
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

Info.contextTypes = contextTypes;

export default Info;
