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
import React, {PropTypes} from 'react';
import {
    InteractionManager,
    StyleSheet,
    View,
    Image,
    DeviceEventEmitter,
    Text,
    ScrollView,
    BackHandler,
    RefreshControl,
    Alert,
    Modal,
    TextInput
} from 'react-native';
import store from 'react-native-simple-store';
import EditView from '../components/EditView';
import Button from '../components/Button';
import TimerButton from '../components/TimerButton';
import FetchLoading from '../components/fetchLoading';
import {
    Actions
} from 'react-native-router-flux';
const propTypes = {
    registerActions: PropTypes.object,
};


const contextTypes = {
    routes: PropTypes.object.isRequired
};
class Register extends React.Component {
    //构造函数，用来初始化数据
    constructor(props) {
        super(props); //在子类constructor中，super代表父类的constructor.bind(this)。是个函数。
        this.state = {
            userName: "",
            password: "",
            email:"",
        };
        this.goBack = this.goBack.bind(this);

    }

  //组件出现前 就是dom还没有渲染到html文档里面
    componentWillMount() {
        //添加回退按键监听
    }

//组件渲染完成 已经出现在dom文档里
    componentDidMount() {
        //删除回退按键监听
        Actions.refresh({
            title: "注册",
            titleStyle: {color: '#808080', fontSize: 20},
            navigationBarStyle: {backgroundColor: "#f2f2f2"},
        });
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }

    onSelectLogin() {
        const {loginActions} = this.props;
        loginActions.requestLogin(this.state.userName, this.state.password);
    }
    onResetReg(){
        //清空文本内容
        this.state = {
            userName: "",
            password: "",
            email:"",
        };
    }
    goBack() {
    }

    onSelectRegister() {
        const { registerActions } = this.props;
        registerActions.requestRegister(this.state.userName,this.state.password,this.state.email);
    }
    _requestSMSCode(shouldStartCountting){
        shouldStartCountting(true);
    }

    render() {
        const { register } = this.props;
        return (
            <View style={styles.loginview}>
                <FetchLoading  showLoading={register.loading} tips="注册中..."/>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                        <Text>邮箱</Text>
                    </View>
                    <View style={{flex:3}}>
                        <EditView name='请输入邮箱地址'  onChangeText={(text) => {
                            this.state.email = text;
                        }}/>
                    </View>
                    <TimerButton enable={5}
                                 style={{width: 110,marginRight: 10}}
                                 textStyle={{color: "#000"}}
                                 timerCount={10}
                                 onClick={(shouldStartCountting)=>{
                                     this._requestSMSCode(shouldStartCountting)
                                 }}/>
                </View>
                <View style={{marginTop: 80}}>
                    <EditView name='请输入用户名'   onChangeText={(text) => {
                        this.state.userName = text;
                    }}/>
                    <EditView name='请输入密码'   onChangeText={(text) => {
                        this.state.password = text;
                    }}/>

                    <View style={styles.rowView}>
                        <View style={{flex: 1}}>
                            <Button
                                containerStyle={styles.sureBtn}
                                style={styles.btnText}
                                text={'注册'}
                                onPress={() => this.onSelectRegister()}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Button
                                containerStyle={styles.sureBtn}
                                style={styles.btnText}
                                text={'重置'}
                                onPress={() => this.onResetReg()}/>
                        </View>
                    </View>
                </View>
            </View>
        )
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
    rowView: {
        flexDirection: 'row',
        marginTop: 10
    }
});
Register.propTypes = propTypes;
Register.contextTypes = contextTypes;

export default Register;
