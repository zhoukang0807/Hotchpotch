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
            newChat:{}
        };
        const {chatListActions} = this.props;
        store.get("loginInfo").then((loginInfo)=>{
            chatListActions.requestChatList(loginInfo.userName);
            store.get("newChat").then((newChat)=>{
                this.setState({
                    loginInfo:loginInfo,
                    newChat:newChat
                })
                monitorMessage(this,chatListActions,"requestChatList",loginInfo.userName)
            })
        })

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
                <Text>暂时没有聊天哟,快去聊天吧</Text>
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
                                                }}>{this.state.newChat[rowData.userName]?this.state.newChat[rowData.userName]:null}</Text>
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

    render() {
        const {loginInfo} = this.state
        const {chatList} = this.props;
        const chatInfos = chatList.chatList;
        var newChatList = []
        for(var i in chatInfos){
            var chatInfo = chatInfos[i]
            var chat ={}
            for(var j = 0;j<chatInfo.length;j++){
                if(chatInfo[j].user._id!=loginInfo.userName){
                    chat={
                        userName:chatInfo[j].user._id,
                        nick:chatInfo[j].user.name,
                        avatar:chatInfo[j].user.avatar
                    }
                    break;
                }
            }
            chatInfo.sort(this.compare('createdAt'))
            chat.text= chatInfo[0].text;
            var time =new Date(chatInfo[0].createdAt)
            time = time.Format("MM-dd hh:mm")
            chat.createdAt=time;
            newChatList.push(chat)
        }
        return(
            <View>
                {this.renderContent(this.state.dataSource.cloneWithRows(newChatList))}
            </View>
        )
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
        newChat[rowData.userName]=0
        store.save("newChat",newChat)
        chatListActions.requestChatList(loginInfo.userName);
        routes.ChatContainer(chatInfo);
    }

    compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value2 - value1;
        }
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
