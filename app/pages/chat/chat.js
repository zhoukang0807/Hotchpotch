import React , { PropTypes } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    BackHandler,
    TouchableHighlight
} from 'react-native';
import store from 'react-native-simple-store';
import CustomView from '../../components/CustomView';
import CustomActions from '../../components/CustomActions';
import Button from '../../components/Button';
import {toastShort} from '../../utils/ToastUtil';
import { monitorMessage } from '../../utils/RequestUtil';

import {
    Actions
} from 'react-native-router-flux';
import {GiftedChat, Actions as GiftedAction, Bubble} from 'react-native-gifted-chat';

const propTypes = {
    chatActions: PropTypes.object,
};
export default class Chat extends React.Component {
    constructor(props) {
        super(props); //在子类constructor中，super代表父类的constructor.bind(this)。是个函数。
        const { chatActions,friend,chat,loginInfo} = this.props;
        if (friend) {
            this.state = {
                friendName: friend.userName,
                nick: friend.nick,
                messages: [],
                loadEarlier: true,
                typingText: null,
                isLoadingEarlier: false
            };
            this.onLoadEarlier();
        }else{
            this.state = {
                friendName:"",
                nick:"",
                messages: [],
                loadEarlier: false,
                typingText: null,
                isLoadingEarlier: false
            };
        }
        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.save= this.save.bind(this);
        this.onReceive = this.onReceive.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);
        this.goBack = this.goBack.bind(this);
        this._isAlright = null;
        this.renderCustomActions = this.renderCustomActions.bind(this);
        global.socketStore.socket.on('message', function (chatInfo) {
            if(chatInfo&&chatInfo.userName==loginInfo.userName){
                var chatInfos = [];
                chatInfos.push(chatInfo)
                this.onReceive(chatInfos);
            }else{
                monitorMessage()
            }
        }.bind(this))
    }
    onReceive(msg) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, msg),
            };
        });
        store.get('loginInfo').then((loginInfo) => {
            this.save(msg,loginInfo)
        })

    }
    //组件出现前 就是dom还没有渲染到html文档里面
    componentWillMount() {
        this._isMounted = true;
    }
    onSend(messages = []) {
        const {friend} = this.props;
        const friendUserName = friend.userName
        console.log(messages);
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages,messages),
            };
        });
        store.get('loginInfo').then((loginInfo) => {
            for (var i = 0; i < messages.length; i++) {
                global.socketStore.socket.emit('message', {
                    from: loginInfo.userName,
                    nick:loginInfo.nick,
                    avatar:loginInfo.avatar,
                    target: friendUserName,
                    msg: messages[0].text
                });
                messages[0].sent = true;
                messages[0].received = false;
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.append(previousState.messages, []),
                    };
                });
            }
            this.save(messages,loginInfo)
        })
    }
    save(messages,loginInfo){
            const {friend} = this.props;
            const friendUserName = friend.userName
            const newMessages =this.state.messages;
            if (messages.length > 0) {
                for(var i = 0;i<messages.length;i++){
                    if(newMessages.indexOf(messages[i])==-1){
                        newMessages.push(messages[i])
                    }
                }
                store.get('chats').then((chats) => {
                    if(chats) {
                        if(chats[loginInfo.userName]){
                            if(chats[loginInfo.userName][friendUserName]&&chats[loginInfo.userName][friendUserName].length!=0){
                                chats[loginInfo.userName][friendUserName]=newMessages;
                                store.save('chats',chats)
                                console.log(chats);
                            }else{
                                chats[loginInfo.userName][friendUserName]=[];
                                chats[loginInfo.userName][friendUserName]=newMessages;
                                store.save('chats',chats)
                                console.log(chats);
                            }
                        }else{
                            chats[loginInfo.userName]={};
                            chats[loginInfo.userName][friendUserName]=[];
                            chats[loginInfo.userName][friendUserName]=newMessages;
                            store.save('chats',chats)
                            console.log(chats);
                        }
                    }else{
                        var newChats = {};
                        newChats[loginInfo.userName]={}
                        newChats[loginInfo.userName][friendUserName]=newMessages;
                        store.save('chats',newChats)
                        console.log(newChats);
                    }
                })
            }
    }
    renderCustomActions(props) {
        if (Platform.OS === 'ios') {
            return (
                <CustomActions
                    {...props}
                />
            );
        }
        const options = {
            '语音': (props) => {

            },
            '视频聊天': (props) => {

            }
        };
        return (
            <GiftedAction
                {...props}
                options={options}
            />
        );
    }

    _record(){
        AudioAndroid.record()
    }
    _stop(){
        AudioAndroid.stop()
    }
    _play(){
        AudioAndroid.play()
    }

    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true,
            };
        });
        store.get("chats").then((chats)=>{
            store.get('loginInfo').then((loginInfo) => {
                setTimeout(() => {
                    if(chats&&chats[loginInfo.userName]
                        &&chats[loginInfo.userName][this.state.friendName]
                        &&chats[loginInfo.userName][this.state.friendName].length!=0
                    ){
                        var sentChats = [];
                        var thisChats = chats[loginInfo.userName][this.state.friendName]
                        for(var i = 0 ; i<thisChats.length;i++){
                            if(sentChats.indexOf(thisChats[i])==-1){
                                sentChats.push(thisChats[i]);
                                console.log(thisChats[i])
                                if (this._isMounted === true) {
                                    this.setState((previousState) => {
                                        return {
                                            messages: GiftedChat.prepend(previousState.messages,thisChats[i]),
                                            loadEarlier: false,
                                            isLoadingEarlier: false,
                                        };
                                    });
                                }
                            }else{
                                if (this._isMounted === true) {
                                    this.setState((previousState) => {
                                        return {
                                            messages: GiftedChat.prepend(previousState.messages,[]),
                                            loadEarlier: false,
                                            isLoadingEarlier: false,
                                        };
                                    });
                                }
                            }
                        }
                    }else{
                        if (this._isMounted === true) {
                            this.setState((previousState) => {
                                return {
                                    messages: GiftedChat.prepend(previousState.messages,[]),
                                    loadEarlier: false,
                                    isLoadingEarlier: false,
                                };
                            });
                        }
                    }
                }, 1000); // simulating network
            })
        })


    }
    //组件渲染完成 已经出现在dom文档里
    componentDidMount() {
        setTimeout(()=> {
            Actions.refresh({
                title:"正在和"+this.state.nick+"聊天",
                titleStyle: {color: '#fff', fontSize: 20},
                navigationBarStyle: {backgroundColor: "#340F19"}
            });
        }, 10)

        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }
    componentWillUnmount() {
        this._isMounted = false;
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }
    goBack(){

    }
    renderCustomView(props) {
        return (
            <CustomView
                {...props}
            />
        );
    }
    renderFooter(props) {
        if (this.state.typingText) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        {this.state.typingText}
                    </Text>
                </View>
            );
        }
        return null;
    }



    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0',
                    }
                }}
            />
        );
    }

    render() {
        const { loginInfo } = this.props;
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                loadEarlier={this.state.loadEarlier}
                onLoadEarlier={this.onLoadEarlier}
                isLoadingEarlier={this.state.isLoadingEarlier}
                user={{
                    _id:loginInfo.userName ,
                    name: loginInfo.nick,
                    avatar: loginInfo.avatar,
                }}
                renderActions={this.renderCustomActions}
                renderBubble={this.renderBubble}
                renderCustomView={this.renderCustomView}
                renderFooter={this.renderFooter}
            />
        );
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#aaa',
    },
});
