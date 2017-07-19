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
import Button from '../../components/Button';
import Pomelo from 'react-native-pomelo';
import { toastShort } from '../../utils/ToastUtil';
import store from 'react-native-simple-store';
import {request} from '../../utils/RequestUtil';
import {REQUSET_ROOM_ADD} from '../../constants/Urls';
import NavigationUtil from '../../utils/NavigationUtil';
class FindResult extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '查找结果',
    });

    constructor(props) {
        super(props);
        this.state = {
        };
        this.onAddFriend=this.onAddFriend.bind(this);
        this.onAddRoom=this.onAddRoom.bind(this);
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

    onAddFriend() {
        const { result } = this.props.navigation.state.params;
        store.get('loginInfo').then((loginInfo) => {
            Pomelo.request("chat.chatHandler.addFriend", {
                from: loginInfo.userName,
                receiver:result.data.userName,
                avatar:loginInfo.avatar
            }, function (data) {
                  if(data.requets.length==0){
                      toastShort("已经向对方发送过请求，请等待对方回复！");
                  }else{
                      toastShort("请求已发送");
                      NavigationUtil.reset(this.props.navigation, 'Home');
                  }
            }.bind(this));
        })
       
    }
    onAddRoom() {
        const { result } = this.props.navigation.state.params;
        store.get('loginInfo').then((loginInfo) => {
            request(REQUSET_ROOM_ADD ,'post' , JSON.stringify({roomName:result.data.roomName,userName:loginInfo.userName})).then(function (data) {
                if (data.resultCode == "0000") {
                    NavigationUtil.reset(this.props.navigation, 'Home');
                }
            }.bind(this))
        });

    }
    render() {
        const { result } = this.props.navigation.state.params;
        if(!result.room){
            return (
                <View style={styles.container}>
                    <View style={styles.rowView}>
                        <Image style={styles.image} source={{uri:result.data.avatar}}/>
                        <View style={styles.textView}>
                            <Text
                                style={styles.text1}> {result.data.nickName}</Text>
                            <Text style={styles.text}>账号：{result.data.userName}</Text>
                        </View>
                    </View>
                    <View style={styles.rowView2}>
                        <Text style={styles.text2}>个人签名:</Text>
                        <Text style={styles.text}>{result.data.sign}</Text>
                    </View>
                    <Button
                        containerStyle={styles.sureBtn}
                        style={styles.btnText}
                        text={'加为好友'}
                        onPress={() => this.onAddFriend()}
                    />
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    <View style={styles.rowView}>
                        <Image style={styles.image} source={{uri: result.data.avatar}}/>
                        <View style={styles.textView}>
                            <Text
                                style={styles.text1}>{result.data.roomTitle}</Text>
                            <Text style={styles.text}>群名：{result.data.roomName}</Text>
                        </View>
                    </View>
                    <Button
                        containerStyle={styles.sureBtn}
                        style={styles.btnText}
                        text={'加入群组'}
                        onPress={() => this.onAddRoom()}
                    />
                </View>
            )
        }

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

export default FindResult;
