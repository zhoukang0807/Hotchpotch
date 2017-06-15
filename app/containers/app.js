import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import TabIcon from '../components/TabIcon';
import About from '../pages/About';
import Main from '../pages/Main';
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
        style.marginTop = computedProps.hideNavBar ? 0 : 64;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};
//隐藏状态栏
StatusBar.setHidden(true);
//TabBarIOS管理两个模块:图书、电影
class App extends React.Component {
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
                        key="tabbar"
                        tabs
                        pressOpacity={0.8}
                        type={ActionConst.REPLACE}
                    >
                        <Scene
                            key="main"
                            component={Main}
                            title="阅读"
                            icon={TabIcon}
                            iconName="home"
                        />
                        <Scene
                            key="about"
                            component={About}
                            title="关于"
                            icon={TabIcon}
                            iconName="md-information-circle"
                        />
                    </Scene>
                </Scene>
            </RouterWithRedux>
        );
    }
}
const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#3e9ce9'
    },
    navBarTitle: {
        color: '#fff',
        fontSize: 20
    }
});

export default App;