import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import ScrollableTabView, {
    DefaultTabBar
} from 'react-native-scrollable-tab-view';
//隐藏状态栏
StatusBar.setHidden(true);
//TabBarIOS管理两个模块:图书、电影
var HotchPotch = React.createClass({
    getInitialState: function () {
        return {
            selectedTab: "图书"
        };
    },
    render: function () {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={() => (
                        <DefaultTabBar tabStyle={styles.tab} textStyle={styles.tabText}/>
                    )}
                    tabBarBackgroundColor="#fcfcfc"
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarActiveTextColor="#3e9ce9"
                    tabBarInactiveTextColor="#aaaaaa"
                >
                    <Text tabLabel='图书'/>
                    <Text tabLabel='电影'/>
                </ScrollableTabView>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: Platform.OS === 'ios' ? 10 : 0
    },
    tab: {
        paddingBottom: 0
    },
    tabText: {
        fontSize: 16
    },
    tabBarUnderline: {
        backgroundColor: '#3e9ce9',
        height: 2
    }
});

AppRegistry.registerComponent('Hotchpotch', () => HotchPotch);