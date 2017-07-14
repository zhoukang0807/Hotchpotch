import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import { Router, Scene, ActionConst,Actions } from 'react-native-router-flux';
import TabIcon from '../components/TabIcon';
import About from '../pages/About';
import LoginContainer from './user/LoginContainer';
import RegisterContainer from './user/RegisterContainer';
import ForgetPassword from './user/ForgetPassword';
import Main from '../pages/Main';
import Read from '../containers/ReadContainer';
import ArticleView from './read/ArticleViewContainer';
import NewFriendContainer from './chat/NewFriendContainer';
import FriendContainer from './chat/FriendContainer';
import ChatContainer from './chat/ChatContainer';
import AddFriend from './user/addFriend';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Splash from '../pages/Splash';
import Color from '../Color';
import FontSize from '../FontSize';
import ModalDropdown from 'react-native-modal-dropdown';
import Friend from '../pages/chat/friend'
const RouterWithRedux = connect()(Router);
const backButton = require('../img/arrow_left.png');
const getSceneStyle = (props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 50;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};
//隐藏状态栏
StatusBar.setHidden(true);
//TabBarIOS管理两个模块:图书、电影
class App extends React.Component {
    queryUser = () => {
        Actions.addFriend()
    }
    render() {
        return (
            <RouterWithRedux
                getSceneStyle={getSceneStyle}
                navigationBarStyle={styles.navBar}
                titleStyle={styles.navBarTitle}
                backButtonImage={backButton}
            >
                <Scene key="root">
                    <Scene
                        key="splash"
                        component={Splash}
                        hideNavBar
                        hideTabBar
                        initial
                    />
                    <Scene
                        key="login"
                        component={LoginContainer}
                        hideTabBar
                        type={ActionConst.REPLACE}
                    />
                    <Scene
                        key="register"
                        hideTabBar
                        component={RegisterContainer}
                    />

                    <Scene
                        key="forgetPassword"
                        hideTabBar
                        component={ForgetPassword}
                    />
                    <Scene
                        key="ChatContainer"
                        hideTabBar
                        component={ChatContainer}
                    />
                    <Scene
                        key="addFriend"
                        hideTabBar
                        component={AddFriend}
                    />
                    <Scene
                        key="NewFriendContainer"
                        hideTabBar
                        component={NewFriendContainer}
                        renderRightButton={() => <ModalDropdown
                            options={['添加好友']}
                            dropdownStyle={{
                                padding:0,
                                marginTop:-16,
                                width: 150,
                                height: 40,
                                borderColor: 'cornflowerblue',
                                borderWidth: 2,
                                borderRadius: 3
                            }}
                            onSelect={(idx, value) =>{
                                if(idx==0){
                                    this.queryUser()
                                }
                                return false
                            }
                            }
                        ><Icon
                            color='#b7e9de'
                            name='md-menu'
                            size={25}
                            /></ModalDropdown>
                        }
                    />
                    <Scene
                        key="articleView"
                        component={ArticleView}
                        hideNavBar
                        hideTabBar
                        type={ActionConst.REPLACE}
                    />

                    <Scene
                        key="tabbar"
                        tabs
                        pressOpacity={0.8}
                        type={ActionConst.REPLACE}
                    >
                        <Scene
                            key="friend"
                            component={FriendContainer}
                            title="聊天"
                            icon={TabIcon}
                            iconName="md-chatbubbles"
                            renderRightButton={() =>  <ModalDropdown
                                defaultValue="+"
                                options={['添加好友', '搜索']}
                                textStyle={{fontSize:35, color:"#bfee2e"}}
                                dropdownStyle={{
                                    padding:0,
                                    marginTop:-16,
                                    width: 150,
                                    height: 75,
                                    borderColor: 'cornflowerblue',
                                    borderWidth: 2,
                                    borderRadius: 3
                                }}
                                onSelect={(idx, value) =>{
                                    if(idx==0){
                                        this.queryUser()
                                    }else if(idx==1){
                                        alert("要搜索了")
                                    }
                                    return false
                                }
                                }
                            ><Icon
                                color='#b7e9de'
                                name='md-menu'
                                size={25}
                            /></ModalDropdown>
                            }
                        />
                        <Scene
                            key="main"
                            component={Main}
                            title="阅读"
                            icon={TabIcon}
                            iconName="md-home"
                        />
                        <Scene
                            key="read"
                            component={Read}
                            title="阅读"
                            icon={TabIcon}
                            iconName="md-book"
                        />
                        <Scene
                            key="about"
                            component={About}
                            title="关于"
                            icon={TabIcon}
                            iconName="md-pricetags"
                        />
                    </Scene>
                </Scene>
            </RouterWithRedux>
        );
    }
}
const styles = StyleSheet.create({
    navBar: {
        backgroundColor: "#340F19"
    },
    navBarTitle: {
        color: '#fff',
        fontSize: 20
    }
});

export default App;