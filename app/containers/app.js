import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import TabIcon from '../components/TabIcon';
import About from '../pages/About';
import AV from 'leancloud-storage'; //云端保存数据
import CategoryContainer from '../containers/CategoryContainer';
import LoginContainer from './user/LoginContainer';
import RegisterContainer from './user/RegisterContainer';
import ForgetPassword from './user/ForgetPassword';
import Main from '../pages/Main';
import Read from '../containers/ReadContainer';
import ArticleView from './read/ArticleViewContainer';
import ChatContainer from '../containers/chat/ChatContainer';
import ChatList from '../pages/chat/chatList';
import { connect } from 'react-redux';
import Splash from '../pages/Splash';
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
    componentDidMount() {
        AV.init({
            appId: 'Tfi1z7dN9sjMwSul8sYaTEvg-gzGzoHsz',
            appKey: '57qmeEJonefntNqRe17dAgi4'
        });
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
                        key="initCategory"
                        component={CategoryContainer}
                        hideNavBar
                        hideTabBar
                        type={ActionConst.REPLACE}
                    />
                    <Scene
                        key="articleView"
                        component={ArticleView}
                        hideNavBar
                        hideTabBar
                        type={ActionConst.REPLACE}
                    />
                    <Scene
                        key="chat"
                        component={ChatContainer}
                        hideTabBar
                        icon={TabIcon}
                    />
                    <Scene
                        key="tabbar"
                        tabs
                        pressOpacity={0.8}
                        type={ ActionConst.REPLACE}
                    >
                        <Scene
                            key="chatList"
                            component={ChatList}
                            title="消息"
                            icon={TabIcon}
                            iconName="md-alert"
                            type={ ActionConst.REFRESH}
                        />

                        <Scene
                            key="main"
                            component={Main}
                            title="阅读"
                            icon={TabIcon}
                            iconName="md-home"
                            type={ ActionConst.REFRESH}
                        />
                        <Scene
                            key="read"
                            component={Read}
                            title="阅读"
                            icon={TabIcon}
                            iconName="md-book"
                            type={ ActionConst.REFRESH}
                        />
                        <Scene
                            key="about"
                            component={About}
                            title="关于"
                            icon={TabIcon}
                            iconName="md-pricetags"
                            type={ ActionConst.REFRESH}
                        />
                    </Scene>


                </Scene>
            </RouterWithRedux>
        );
    }
}
const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#b7e9de'
    },
    navBarTitle: {
        color: '#fff',
        fontSize: 20
    }
});

export default App;