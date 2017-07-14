import React from 'react';
import About from '../pages/About';
import { StackNavigator, TabNavigator } from 'react-navigation';
import LoginContainer from './user/LoginContainer';
import RegisterContainer from './user/RegisterContainer';
import ForgetPassword from './user/ForgetPassword';
import Read from '../containers/ReadContainer';
import ArticleView from './read/ArticleViewContainer';
import ChatContainer from '../containers/chat/ChatContainer';
import ContactContainer from '../containers/chat/ContactContainer';
import ChatList from '../pages/chat/chatList';
import Splash from '../pages/Splash';
import ContactInfo from '../pages/user/contactInfo';
import SearchList from '../pages/searching/serachList';
import BlogView from '../pages/searching/blogView';
const TabContainer = TabNavigator(
    {
        ChatList: { screen: ChatList },
        Contact: { screen: ContactContainer },
        SearchList: { screen: SearchList },
        About: { screen: About },
    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#595959',
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
        Article: { screen: ArticleView },
        Chat: { screen: ChatContainer },
        ContactInfo: { screen: ContactInfo },
        Read: { screen: Read },
        BlogView: { screen: BlogView},
    },
    {
        headerMode: 'screen',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#595959',
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