import React,{PropTypes} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    BackHandler,
    InteractionManager,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import {GiftedChat, Actions, Bubble,LoadEarlier} from 'react-native-gifted-chat';
import CustomActions from '../../components/CustomActions';
import CustomView from '../../components/CustomView';
import Pomelo from 'react-native-pomelo';
import NavigationUtil from '../../utils/NavigationUtil';
let Count=0;
const propTypes = {
    chatActions: PropTypes.object,
    chat: PropTypes.object.isRequired
};

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false
        };
        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.onReceive = this.onReceive.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);
        this.goBack = this.goBack.bind(this);
        this._isAlright = null;
        this.props.navigation.goBack=this.goBack;
    }
    componentWillMount() {
        this._isMounted = true;
        Count=0;
        InteractionManager.runAfterInteractions(() => {
            const { loginInfo,sessionData } =this.props.navigation.state.params;
            //获取用户聊天记录,并显示
            Pomelo.request("chat.chatHandler.getMessages", {
                count:Count,
                from: loginInfo.userName,
                receiver: sessionData.room?sessionData.roomName:sessionData.userName
            }, function (data) {
                Count+=data.messages.length;
                this.setState((previousState) => {
                    return {
                        messages: data.messages.reverse(),
                        loadEarlier: data.loadMore,
                    };
                });
            }.bind(this));
        });

    }
    //销毁
    componentWillUnmount() {
        this._isMounted = false;
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }
    //渲染完成
    componentDidMount() {
        const { loginInfo,sessionData } =this.props.navigation.state.params;
        Pomelo.on('onAdd', function (data) {

        }.bind(this));
        Pomelo.on('onChat', function (chatInfos) {
            let flag = false;
            for(var i=0;i<chatInfos.length;i++){
                if(chatInfos[i].user._id == loginInfo.userId){
                    flag = true;
                    break;
                }
            }
            if(flag){
                return;
            }
            this.onReceive(chatInfos);
        }.bind(this));
        if(sessionData.room){
            const { chatActions } = this.props;
            chatActions.requestUserList(sessionData.roomId);
        }

        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }
    goBack() {
       Pomelo.disconnect();
       NavigationUtil.reset(this.props.navigation, 'Home');
    }
    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true,
            };
        });

        const { loginInfo,sessionData } =this.props.navigation.state.params;
        //获取用户聊天记录,并显示
        Pomelo.request("chat.chatHandler.getMessages", {
            count:Count,
            from: loginInfo.userName,
            receiver: sessionData.room?sessionData.roomName:sessionData.userName
        }, function (data) {
            Count+=data.messages.length;
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.prepend(previousState.messages,data.messages.reverse()),
                    loadEarlier: data.loadMore,
                    isLoadingEarlier: false,
                };
            });
        }.bind(this));
    }

    onSend(messages = []) {
        let users=[];
        const {loginInfo,sessionData} = this.props.navigation.state.params;
        const {chat} = this.props;
        if(chat.users.length==0){
            users.push({userId:sessionData.userId,userName:sessionData.userName});
        }else{
            users = chat.users;
        }

        if (messages.length > 0) {
            Pomelo.request("chat.chatHandler.send", {
                content: messages,
                from: loginInfo.userName,
                receivers: users
            }, function (data) {
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.append(previousState.messages, messages),
                    };
                });
            }.bind(this));
        }
    }

    onReceive(msg) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, msg),
            };
        });
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
            'Action 1': (props) => {
                alert('option 1');
            },
            'Action 2': (props) => {
                alert('option 2');
            },
            'Cancel': () => {
            },
        };
        return (
            <Actions
                {...props}
                options={options}
            />
        );
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
        const {loginInfo} = this.props.navigation.state.params;
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                loadEarlier={this.state.loadEarlier}
                onLoadEarlier={this.onLoadEarlier}
                isLoadingEarlier={this.state.isLoadingEarlier}
                user={{
                    _id: loginInfo.userId, // sent messages should have same user._id
                    name: loginInfo.userName,
                    avatar: 'https://facebook.github.io/react/img/logo_og.png',
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
Chat.propTypes = propTypes;



