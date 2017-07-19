import React, {PropTypes} from 'react';
import {
    InteractionManager,
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    TextInput,
    findNodeHandle,
    ScrollView
} from 'react-native';
import Button from '../../components/Button';
import {request} from '../../utils/RequestUtil';
import {REQUSET_CREATE_ROOM} from '../../constants/Urls';
import NavigationUtil from '../../utils/NavigationUtil';
import store from 'react-native-simple-store';
export default class RoomCreate extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '新建群组',
    });
    constructor(props) {
        super(props);
        this.state = {
            roomName: "",
            roomTitle: "",
        };
        this.onSelectCreate=this.onSelectCreate.bind(this);
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


    onSelectCreate() {
        store.get('loginInfo').then((loginInfo) => {
            request(REQUSET_CREATE_ROOM ,'post' , JSON.stringify({roomName:this.state.roomName,roomTitle:this.state.roomTitle,createUserName:loginInfo.userName})).then(function (data) {
                if (data.resultCode == "0000") {
                    NavigationUtil.reset(this.props.navigation, 'Home');
                }
            }.bind(this))
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{marginTop: 20}}>
                    <View style={styles.rowView}>
                        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.text}>群名称:</Text>
                        </View>
                        <View style={{flex: 6}}>
                            <TextInput placeholder='请输入群名（唯一）'
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => {
                                           this.state.roomName = text;
                                       }}
                            />
                        </View>
                    </View>
                    <View style={styles.rowView}>
                        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.text}>群标题:</Text>
                        </View>
                        <View style={{flex: 6}}>
                            <TextInput placeholder='请输群标题'
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => {
                                           this.state.roomTitle = text;
                                       }}
                            />
                        </View>
                    </View>

                    <Button
                        containerStyle={styles.sureBtn}
                        style={styles.btnText}
                        text={'创建'}
                        onPress={() => this.onSelectCreate()}/>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#ffffff',
    },
    rowView: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomColor: "#f1f1f1",
        borderBottomWidth: 1
    },
    text:{
       color:"#595959",
        fontSize: 16,
        fontWeight: 'bold'
    },
    loginImage: {
        flexDirection: 'row',
        height: 100,
        marginTop: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    sureBtn: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#595959'
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    },
    loginLeftText: {
        color: "#595959",
        textAlign: 'left'
    },
    loginRightText: {
        color: "#595959",
        textAlign: 'right'
    },
    bottomView: {
        flexDirection: 'row',
        marginTop: 10,
    }
});

