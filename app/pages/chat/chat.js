import React,{PropTypes} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    BackHandler
} from 'react-native';
import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';
import {
    Actions as tabAction
} from 'react-native-router-flux';
import CustomActions from '../../components/CustomActions';
import CustomView from '../../components/CustomView';
import Pomelo from 'react-native-pomelo';
const propTypes = {
    chatActions: PropTypes.object,
};

const contextTypes = {
    routes: PropTypes.object.isRequired
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
        this.init=this.init.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onReceive = this.onReceive.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);
        this.goBack = this.goBack.bind(this);
        this._isAlright = null;
    }
    init(){

    }
    componentWillMount() {
        this._isMounted = true;
    }
    //销毁
    componentWillUnmount() {
        this._isMounted = false;
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }
    //渲染完成
    componentDidMount() {
        const { sessionData } = this.props;
        Pomelo.on('onAdd', function (data) {

        }.bind(this));
        Pomelo.on('onChat', function (chatInfos) {
            let flag = false;
            for(var i=0;i<chatInfos.length;i++){
                if(chatInfos[i].user._id == this.props.loginInfo.userId){
                    flag = true;
                    break;
                }
            }
            if(flag){
                return;
            }
            this.onReceive(chatInfos);
        }.bind(this));
        if(this.props.sessionData.room){
            const { chatActions } = this.props;
            chatActions.requestUserList(this.props.sessionData.id);
        }
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }
    goBack() {
       Pomelo.disconnect();
    }

    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true,
            };
        });

        setTimeout(() => {
            if (this._isMounted === true) {
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.prepend(previousState.messages, require('../data/old_messages.js')),
                        loadEarlier: false,
                        isLoadingEarlier: false,
                    };
                });
            }
        }, 1000); // simulating network
    }

    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
        let users=[];
        const {loginInfo,sessionData} = this.props;
        const {chat} = this.props;
        if(chat.users.length==0){
            users.push({userId:sessionData.id,userName:sessionData.userName});
        }else{
            users = chat.users;
        }

        if (messages.length > 0) {
            Pomelo.request("chat.chatHandler.send", {
                content: messages,
                from: loginInfo.userName,
               receivers: users
            }, function (data) {
                for(var i = 0;i<messages.length;i++){
                   messages[i].sent = true;
                   messages[i].received = false;
                }
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.append(previousState.messages, []),
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
        const {loginInfo} = this.props;
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
Chat.contextTypes = contextTypes;



