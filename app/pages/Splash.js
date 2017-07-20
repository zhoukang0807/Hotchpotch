import React, {PropTypes} from 'react';
import {Dimensions, Animated} from 'react-native';
import { USER_LOGIN } from '../constants/Urls';
import { request } from '../utils/RequestUtil';
import store from 'react-native-simple-store';
const contextTypes = {
    routes: PropTypes.object.isRequired
};

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../img/splash.png');

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1)
        };
    }

    componentDidMount() {
        const {routes} = this.context;
        Animated.timing(this.state.bounceValue, {
            toValue: 1.2,
            duration: 1000
        }).start();
        this.timer = setTimeout(() => {
            store.get('loginInfo').then((loginInfo) => {
                if (loginInfo) {
                    request(USER_LOGIN, 'post', JSON.stringify({userName:loginInfo.userName,password:loginInfo.password})).then(function (data) {
                        if(data.resultCode=="0000"){
                            store.save('loginInfo',data.loginInfo);
                            global.socketStore.socket.emit('login', {userName: loginInfo.userName});
                            routes.tabbar({loginInfo:loginInfo});
                        }else{
                            store.delete('loginInfo');
                            routes.login();
                        }
                    })
                } else {
                    routes.login();
                }
            });
        }, 1000);
    }

    componentWillUnmount() {}

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

Splash.contextTypes = contextTypes;

export default Splash;
