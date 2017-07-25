import React, { PropTypes } from 'react';
import {
    InteractionManager,
    StyleSheet,
    View,
    ListView,
    Text,
    Image,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    Modal
} from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/Ionicons';
import { request } from '../../utils/RequestUtil';
import { QUERY_USERINFO } from '../../constants/Urls';

import Button from '../../components/Button';
import FetchLoading from '../../components/fetchLoading';
import { monitorMessage } from '../../utils/RequestUtil';
import { toastShort } from '../../utils/ToastUtil';
import {
    Actions
} from 'react-native-router-flux';


const contextTypes = {
    routes: PropTypes.object.isRequired
};

export default class ChatList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loginInfo:{},
            newChat:{},
            modalVisible:false,
            selectChatInfo:{},
            newChatList:[]
        };
        const {chatListActions} = this.props;
        store.get("loginInfo").then((loginInfo)=>{
            chatListActions.requestChatList(loginInfo.userName);
            store.get("newChat").then((newChat)=>{
                this.setState({
                    loginInfo:loginInfo,
                    newChat:newChat,
                })
                monitorMessage(this,chatListActions,"requestChatList",loginInfo.userName)
            })
        })
        this.setModalVisible=this.setModalVisible.bind(this)
        this.delectChat=this.delectChat.bind(this)
        this.chatList=this.chatList.bind(this)
    }

//组件出现前 就是dom还没有渲染到html文档里面
    componentWillMount() {

    }
//组件渲染完成 已经出现在dom文档里
    componentDidMount() {

    }

    componentWillUnmount() {
    }



    renderContent(dataSource, typeId) {
        const {chatList} = this.props;
        if(chatList.success&&this.isEmptyObject(chatList.chatList)){
            return (
                <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{fontSize:22}}>暂时没有聊天哟,快去聊天吧</Text>
                </View>
            );
        }
        return (
            <ListView
                enableEmptySections={true}
                dataSource={dataSource}
                renderRow={(rowData) => {
                    console.log(rowData);
                    return (
                        <View >
                            <TouchableOpacity
                                onPress={() => {
                                    this.privateChat(rowData)
                                }}
                                onLongPress={() =>{ this.setModalVisible(true,rowData) }}
                                underlayColor="rgb(210,230,255)"
                                activeOpacity={0.5}
                                style={{borderRadius: 8, padding: 0, marginTop: 0}}>
                                <View style={{height: 60, marginTop: 5}}>
                                    <View style={styles.row}>
                                        <Image style={styles.thumb} source={{uri: rowData.avatar}}/>
                                        <View style={{flex: 2, flexDirection: 'column',}}>
                                            <View style={{flexDirection: 'row',}}>
                                                <Text style={{
                                                    marginLeft: 3,
                                                    flex: 2,
                                                    fontSize: 16,
                                                }}>{rowData.nick}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row',}}>
                                                <Text style={{
                                                    marginLeft: 3,
                                                    flex: 2,
                                                    fontSize: 16,
                                                }}>{rowData.text}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'column',}}>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={{
                                                    marginLeft: 3,
                                                    flex: 2,
                                                    fontSize: 16,
                                                }}>{rowData.createdAt}</Text>
                                                <Text style={{
                                                    marginLeft: 3,
                                                    flex: 2,
                                                    fontSize: 16,
                                                }}>{this.state.newChat&&this.state.newChat[rowData.userName]?this.state.newChat[rowData.userName]:null}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.separator}/>
                                </View>
                            </TouchableOpacity>
                        </View>

                    )
                }
                }
            />
        );
    }
    setModalVisible(visible,selectChatInfo) {
        this.setState({modalVisible: visible,selectChatInfo:selectChatInfo});
    }
    render() {
        const loginInfo = this.state.loginInfo
        if (JSON.stringify(loginInfo) == "{}") {
            return <View></View>
        } else {
            if(this.state.newChatList.length==0){
                this.chatList().then(function (newChatList) {
                    if(newChatList){
                        this.setState({newChatList:newChatList})
                    }
                }.bind(this))
            }
            return (
                <View style={{flex:1}}>
                    {this.renderContent(this.state.dataSource.cloneWithRows(this.state.newChatList))}
                    <Modal
                        animationType="slide"
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={() => {
                            this.setModalVisible(false, "")
                        }}
                    >
                        <View style={styles.loading}>
                            <View style={styles.modalTitle}>
                                <Icon
                                    color='#b7e9de'
                                    name='md-close'
                                    size={20}
                                    onPress={() =>
                                        this.setModalVisible(false, "")}
                                />
                            </View>
                            <View style={styles.modalView}>
                                <View style={styles.rowView}>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon
                                            color='#b7e9de'
                                            name='md-person-add'
                                            size={25}
                                        />
                                    </View>
                                    <View style={{flex: 6, flexDirection: 'row',}}>
                                        <Text style={{flex: 8}} onPress={() => {
                                            this.delectChat()
                                        }}>删除对话</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            )
        }
    }

    chatList() {
        return new Promise(function (resolve, reject){
            const loginInfo = this.state.loginInfo
            const {chatList} = this.props;
            const chatInfos = chatList.chatList;

            var newChatList = [];
            var friendNames = []
            for (var i in chatInfos) {
                friendNames.push(i)
            }
            var a = 0;

            function compare(property){
                return function(a,b){
                    var value1 = a[property];
                    var value2 = b[property];
                    return value2 - value1;
                }
            }

            function addChat() {
                var friendName = friendNames[a];
                a++
                var chats = chatList.chatList[friendName];
                var chat = {userName:friendName}
                chats.sort(compare('createdAt'))
                chat.text= chats[0].text;
                var time =new Date(chats[0].createdAt)
                time = time.Format("MM-dd hh:mm")
                chat.createdAt=time;
                for (var j = 0; j < chats.length; j++) {
                    if (chats[j].user._id != loginInfo.userName) {
                        chat.nick = chats[j].user.name;
                        chat.avatar = chats[j].user.avatar
                        break;
                    }
                }
                if(!chat.nick||!chat.avatar){
                    request(QUERY_USERINFO,"post",JSON.stringify({userName:friendName})).then(function (result) {
                        console.log(result)
                        chat.nick = result.data.nick;
                        chat.avatar=result.data.avatar;
                        newChatList.push(chat)
                        if(a==friendNames.length){
                            resolve(newChatList)
                        }else{
                            addChat()
                        }
                    })
                }else{
                    newChatList.push(chat)
                    if(a==friendNames.length){
                        resolve(newChatList)
                    }else{
                        addChat()
                    }
                }
            }
            addChat()
        }.bind(this))

    }

    delectChat(){
        const {chatListActions} = this.props;
        const loginInfo = this.state.loginInfo;
        const selectUserName = this.state.selectChatInfo.userName;
        store.get("chats").then((chats)=>{
            const newChats = chats;
            delete  newChats[loginInfo.userName][selectUserName];
            store.save("chats",newChats).then(function () {
                chatListActions.requestChatList(loginInfo.userName);
                this.setModalVisible(false)
            }.bind(this))
        })
    }
    privateChat(rowData){
        const { routes } = this.context;
        const {chatListActions} = this.props;
        const {loginInfo} = this.state;
        const chatInfo = {
            friend:rowData,
            loginInfo:loginInfo
        }
        var newChat =  this.state.newChat
        if(newChat){
            newChat[rowData.userName]=0
            this.setState({newChat})
        }
        store.save("newChat",newChat)
        routes.ChatContainer(chatInfo);

    }


    isEmptyObject(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    }
}

const styles = StyleSheet.create({
    row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    thumb: {
        margin:2,
        width: 48,
        height: 48,
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        flex: 1,
    },
    modalTitle:{
        paddingRight:4,
        alignItems:"flex-end",
        justifyContent: 'center',
        backgroundColor:"#99c3ac",
        width:200,
        height:20,
    },
    rowView: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomColor: "#f1f1f1",
        borderBottomWidth: 1
    },
    modalView: {
        width:200,
        height:40,
        marginBottom: 10,
        backgroundColor:"#fff",
        borderColor:"#e1e1e1",
        borderWidth:1
    },
});

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

ChatList.contextTypes = contextTypes;
