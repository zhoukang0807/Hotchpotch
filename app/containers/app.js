import React from 'react';
import About from '../pages/About';
import { StackNavigator, TabNavigator } from 'react-navigation';
import LoginContainer from './user/LoginContainer';
import RegisterContainer from './user/RegisterContainer';
import ForgetPassword from './user/ForgetPassword';
import Read from '../containers/ReadContainer';
import ArticleView from './read/ArticleViewContainer';
import ChatContainer from '../containers/chat/ChatContainer';
import ChatList from '../pages/chat/chatList';
import Splash from '../pages/Splash';

const TabContainer = TabNavigator(
    {
        ChatList: { screen: ChatList },
        Read: { screen: Read },
        About: { screen: About },
        Chat: { screen: ChatContainer },
    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#b7e9de',
            inactiveTintColor: '#999999',
            showIcon: true,
            style: {
                backgroundColor: '#fff'
            },
            indicatorStyle: {
                opacity: 0
            },
            tabStyle: {
                padding: 0
            }
        }
    }
);

const App = StackNavigator(
    {
        Splash: { screen: Splash },
        Login: {
            screen: LoginContainer,
            navigationOptions: {
                headerLeft: null
            }
        },
        Register: {
            screen: RegisterContainer,
        },
        Forget: {
            screen: ForgetPassword,
        },
        Home: {
            screen: TabContainer,
            navigationOptions: {
                headerLeft: null
            }
        },
        Article: { screen: ArticleView }
    },
    {
        headerMode: 'screen',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#b7e9de',
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 20,
            },
            headerTintColor: '#fff'
        }
    }
);

export default App;