/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React, { PropTypes } from 'react';
import {
    InteractionManager,
    StyleSheet,
    View,
    Image,
    DeviceEventEmitter,
    Text,

    ScrollView,
    RefreshControl,
    Alert
} from 'react-native';
import EditView from '../components/EditView';
import Button from '../components/Button';
let tempTypeIds = [];
const contextTypes = {
    routes: PropTypes.object.isRequired
};
class Login extends React.Component {
    //构造函数，用来初始化数据
    constructor(props) {
        super(props); //在子类constructor中，super代表父类的constructor.bind(this)。是个函数。
        this.userName = "";
        this.password = "";
        this.state = {
            typeIds: tempTypeIds
        };
    }

    componentWillMount() {
       　
    }

    componentDidMount() {
      　
    }
    onSelectLogin() {
        const { routes } = this.context;
        routes.initCategory({ isFirst: true });
    }
    render() {
        return(
            <View style={styles.loginview}>
                <View   style={{flexDirection: 'row',height:100,marginTop:1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',}}>
                    <Image source={require('../img/login.png')}/>
                </View>
                <View style={{marginTop:80}}>
                    <EditView  name='输入用户名/注册手机号' onChangeText={(text) => {
                        this.userName = text;
                    }}/>
                    <EditView name='输入密码' onChangeText={(text) => {
                        this.password = text;
                    }}/>
                    <Button
                        containerStyle={styles.sureBtn}
                        style={styles.btnText}
                        text={'登录'}
                        onPress={() => this.onSelectLogin()}/>
                    <Text style={{color:"#4A90E2",textAlign:'center',marginTop:10}} >忘记密码？</Text>
                </View>
            </View>
        )
    }
    onPressCallback = () => {

    };

    //跳转到第二个页面去
    onLoginSuccess(){
    }
}

const styles = StyleSheet.create({
    loginview: {
        flex: 1,
        padding: 30,
        backgroundColor: '#ffffff',
    },
    sureBtn: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#3e9ce9'
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    },
});

Login.contextTypes = contextTypes;

export default Login;
