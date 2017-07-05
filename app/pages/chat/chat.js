import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    BackHandler
} from 'react-native';
import store from 'react-native-simple-store';
import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';
import CustomActions from '../../components/CustomActions';
import CustomView from '../../components/CustomView';
import Pomelo from 'react-native-pomelo';
import { toastShort } from '../../utils/ToastUtil';
export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false,
        };
        Pomelo.on('onAdd', function (data) {

        });
        Pomelo.on('onChat', function (chatInfo) {
            const {loginInfo} = this.props;
            let flag = false;
            for (var i = 0; i < this.state.messages.length; i++) {
                if (chatInfo._id == this.state.messages[i]._id) {
                    this.state.messages[i].sent = true;
                    this.state.messages[i].received = false;
                    flag = true;
                    break;
                }
            }
            if (chatInfo.user._id == loginInfo.userId || flag) {
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.append(previousState.messages,[]),
                    };
                });
                return;
            }
            this.onReceive(chatInfo);
        }.bind(this));
        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.onReceive = this.onReceive.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);
        this.goBack = this.goBack.bind(this);
        this._isAlright = null;
    }

    componentWillMount() {
        const {chatActions} = this.props;
        const {loginInfo} = this.props;
        chatActions.requestChat(loginInfo.userId, loginInfo.userName);
        this._isMounted = true;

    }
    //销毁
    componentWillUnmount() {
        this._isMounted = false;
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }
    //渲染完成
    componentDidMount() {

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
        const {loginInfo} = this.props;
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
        var route = "chat.chatHandler.send";
        var target = "*";
        if (messages.length > 0) {
            Pomelo.request(route, {
                rid: "admin",
                content: messages[0],
                from: loginInfo.userName,
                target: target
            }, function (data) {
            });
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




