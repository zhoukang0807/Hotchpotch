import React, {PropTypes} from 'react';
import {Dimensions, Animated} from 'react-native';
import store from 'react-native-simple-store';
import {request} from '../utils/RequestUtil';
import {USER_LOGIN} from '../constants/Urls';
import { enterWebScoket } from '../utils/RequestUtil';
import NavigationUtil from '../utils/NavigationUtil';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../img/splash.png');

class Splash extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1)
        };
    }

    componentDidMount() {
        const {navigate} = this.props.navigation;
        Animated.timing(this.state.bounceValue, {
            toValue: 1.2,
            duration: 1000
        }).start();
        this.timer = setTimeout(() => {
            store.get('loginInfo').then((loginInfo) => {
                    if (loginInfo) {
                        request(USER_LOGIN, 'post', JSON.stringify({
                            userName: loginInfo.userName,
                            password: loginInfo.password
                        })).then(function (data) {
                            enterWebScoket(data.loginInfo.userId,data.loginInfo.userId,data.loginInfo.userName);
                            NavigationUtil.reset(this.props.navigation, 'Home',{ loginInfo});
                        }).catch(function () {
                            store.delete('loginInfo')
                            navigate('Login');
                        })
                    } else {
                        navigate('Login');
                    }
                }
            )
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <Animated.Image
                style={{
                    width: maxWidth,
                    height: maxHeight,
                    transform: [{scale: this.state.bounceValue}]
                }}
                source={splashImg}
            />
        );
    }
}
export default Splash;
