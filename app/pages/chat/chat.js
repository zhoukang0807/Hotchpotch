import React, {PropTypes} from 'react';
import {
    InteractionManager,
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    TextInput,
    ListView
} from 'react-native';
import store from 'react-native-simple-store';
import {isNull} from '../../utils/utils';
import Button from '../../components/Button';
import FetchLoading from '../../components/fetchLoading';
import {toastShort} from '../../utils/ToastUtil';
import Icon from 'react-native-vector-icons/Ionicons';
import Pomelo from 'react-native-pomelo';
const propTypes = {
    chatActions: PropTypes.object,
};

const contextTypes = {
    routes: PropTypes.object.isRequired
};
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            msg:"",
            userName:"",
            userId:""
        };
        Pomelo.on('onAdd', function (data) {
            console.log(data.user + "ONADD")
            let userName = data.user;
            const {chatActions} = props;
            chatActions.onAddChat(userName);
        });
        Pomelo.on('onChat', function (chatInfo) {
            console.log(JSON.stringify(chatInfo))
            const {chatActions} = props;
            chatActions.onChatChat(chatInfo);
        });
        this.renderItem = this.renderItem.bind(this);
    }

//组件出现前 就是dom还没有渲染到html文档里面
    componentWillMount() {
        store.get('loginInfo').then((loginInfo) => {
          this.setState({ userName:loginInfo.userName})
        })
    }

//组件渲染完成 已经出现在dom文档里
    componentDidMount() {
        const {chatActions} = this.props;
        store.get('loginInfo').then((loginInfo) => {
            chatActions.requestChat(loginInfo.userId, loginInfo.userName);
        })
    }

    //官方的解释是组件被移除前执行
    componentWillUnmount() {
    }

    renderTips() {
        const {chat} = this.props;
        return (
            <View style={styles.rowView}>
                <Text style={styles.tipsText}>{chat.userName}进入聊天室</Text>
            </View>
        )
    }

    renderItem(rowData) {
        let userPersonal=this.state.userName==rowData.from;
        let flexstyle=userPersonal?"row-reverse":"row";
        let rowBackColor=userPersonal?"#99f1fe":"#FFF";
        return (
            <View style={styles.containerItem}>
                <View style={{flex:1, flexDirection: flexstyle, alignItems: 'center'}}>
                    <Image style={styles.itemImg} source={require("../../img/share_icon_wechat.png")} />
                    <View style={{backgroundColor:rowBackColor,padding:5}}>
                        <Text> {rowData.msg}</Text>
                    </View>
                    <Text style={{fontSize:10}}> {rowData.from}</Text>
                </View>
            </View>
        )
    }

    renderContent(dataSource, typeId) {
        const {chat} = this.props;
        if(chat.chatInfos.length==0){
            return (
                <Text></Text>
            );
        }
        return (
            <ListView
                initialListSize={1}
                dataSource={dataSource}
                renderRow={this.renderItem}
                style={styles.listView}
            />
        );
    }
    onSendMessage(){
        store.get('loginInfo').then((loginInfo) => {
            var route = "chat.chatHandler.send";
            var target = "*";
            var msg = this.state.msg;
            if(!isNull(msg)) {
                Pomelo.request(route, {
                    rid: "admin",
                    content: msg,
                    from: loginInfo.userName,
                    target: target
                }, function(data) {
                });
            }
        })
    }
    renderSendText(){
        return (
            <View style={styles.rowBottom}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Icon
                        color='#000'
                        name='ios-mail-outline'
                        size={30}
                    />
                </View>
                <View style={{flex: 8}}>
                    <TextInput placeholder=''
                               onChangeText={(text) => {
                                   this.state.msg = text;
                               }}
                    />
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button
                    containerStyle={styles.sureBtn}
                    style={styles.btnText}
                    text={'发送'}
                    onPress={() => this.onSendMessage()}
                />
                </View>
            </View>
        );
    }
    render() {
        InteractionManager.runAfterInteractions(() => {
            // ...耗时较长的同步的任务...避免影响动画
            store.get('loginInfo').then((loginInfo) => {
            })
        });
        const {chat} = this.props;
        return (
            <View style={styles.continer}>
                {this.renderTips()}
                {this.renderContent(this.state.dataSource.cloneWithRows(chat.chatInfos))}
                <View style={styles.BottomView}>
                    {this.renderSendText()}
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        backgroundColor: "#f3f3f3",
    },
    rowView: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: 'center',
    },
    BottomView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    rowBottom: {
        flexDirection: 'row',
        backgroundColor: "#f0f0f0",
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    tipsText: {
        textAlign: 'center',
        color: "#a0e9b7",
        fontSize: 12
    },
    itemImg: {
        width: 40,
        height: 30,
        marginRight: 5
    },
    no_data: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100
    },
    base: {
        flex: 1
    },
    listView: {
        backgroundColor: '#f3f3f3',
    },

    containerItem: {
        marginTop:10,
        flexDirection: 'row',
    },
    sureBtn: {
        backgroundColor: '#40b5e9',
        borderWidth:2,
        borderColor:"#99f1fe"
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    },
});
Chat.propTypes = propTypes;
Chat.contextTypes = contextTypes;

export default Chat;
