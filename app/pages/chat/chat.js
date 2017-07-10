import React , { PropTypes } from 'react';
import {
    InteractionManager,
    StyleSheet,
    View,
    Image,
    DeviceEventEmitter,
    Text,
    ScrollView,
    BackHandler,
    RefreshControl,
    Alert,
    Platform,
    Modal,
    TextInput
} from 'react-native';
import store from 'react-native-simple-store';
import CustomView from '../../components/CustomView';
import CustomActions from '../../components/CustomActions';
import Button from '../../components/Button';

import {toastShort} from '../../utils/ToastUtil';
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
        const { chatActions,friendUserName } = this.props;
        if (friendUserName) {
            this.state = {
                friendName: friendUserName,
                messages: []
            };
            store.get('loginInfo').then((loginInfo) => {
                chatActions.requestChat(loginInfo.userName,friendUserName);
            })
        }else{
            this.state = {
                friendName: "",
                messages: []
            };
        }
        this.onSend = this.onSend.bind(this);
        this.goBack = this.goBack.bind(this);
        this.renderCustomView = this.renderCustomView.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        global.socketStore.socket.on('message', function (chatInfos) {
            console.log(chatInfos);
            let flag = false;
            for(var i=0;i<chatInfos.length;i++){
                if(chatInfos[i].userId != this.props.loginInfo.userId){
                    flag = true;
                    break;
                }
            }
            if(flag){
                return;
            }
            this.onReceive(chatInfos);

        }.bind(this))

    }
    onReceive(msg) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, msg),
            };
        });
    }
    //组件出现前 就是dom还没有渲染到html文档里面
    componentWillMount() {

    }
    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages,messages),
            };
        });
        console.log(this.state.messages);
        store.get('loginInfo').then((loginInfo) => {
            const {friendUserName} = this.props;
            if (messages.length > 0) {
                for(var i = 0;i<messages.length;i++){
                    global.socketStore.socket.emit('message', {from: loginInfo.userName, target: friendUserName,msg:messages[i].text});
                    messages[i].sent = true;
                    messages[i].received = false;
                }
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.append(previousState.messages, []),
                    };
                });
            }
        })
    }
    //组件渲染完成 已经出现在dom文档里
    componentDidMount() {
        Actions.refresh({
            title:"正在和"+this.state.friendName+"聊天",
            titleStyle: {color: '#fff', fontSize: 20},
            navigationBarStyle: {backgroundColor: "#b7e9de"}
        });
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }
    goBack(){}
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

    render() {
        const { loginInfo } = this.props;
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                    _id: loginInfo.userId, // sent messages should have same user._id
                    name: loginInfo.userName,
                    avatar: 'https://facebook.github.io/react/img/logo_og.png',
                }}
                renderActions={this.renderCustomActions}
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
