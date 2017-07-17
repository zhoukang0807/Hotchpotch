import React, { PropTypes } from 'react';
import {
    InteractionManager,
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    TextInput
} from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import FetchLoading from '../../components/fetchLoading';
import { toastShort } from '../../utils/ToastUtil';
import {
    Actions
} from 'react-native-router-flux';
const propTypes = {
    loginActions: PropTypes.object,
};

const contextTypes = {
    routes: PropTypes.object.isRequired
};
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password : "",
        };
    }
//组件出现前 就是dom还没有渲染到html文档里面
    componentWillMount() {
        // store.delete('loginInfo')
    }
//组件渲染完成 已经出现在dom文档里
    componentDidMount() {
        Actions.refresh({
            title: "登陆",
            titleStyle:{ color: '#fff',fontSize: 20},
            navigationBarStyle:{backgroundColor:"#b7e9de"}
        });
    }
    //官方的解释是组件被移除前执行
    componentWillUnmount() {
    }
    onSelectLogin() {
        if(this.state.userName==""||this.state.password==""){
            toastShort("用户名或密码不能为空!");
            return;
        }
        const { loginActions } = this.props;
        loginActions.requestLogin(this.state.userName,this.state.password);
    }
    render() {
        InteractionManager.runAfterInteractions(() => {
            // ...耗时较长的同步的任务...避免影响动画
            store.get('loginInfo').then((loginInfo) => {
                if(loginInfo){
                        const { routes } = this.context;
                        routes.tabbar({loginInfo:loginInfo});
                } })
        });

        const { login } = this.props;
        return(
            <View style={styles.loginview}>
                <FetchLoading  showLoading={login.loading} tips="登陆中..."/>
                <View   style={styles.loginImage}>
                    <Image source={require('../../img/login.png')}/>
                </View>
                <View style={{marginTop:80}}>
                    <View style={styles.rowView}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Icon
                                color='#b7e9de'
                                name='md-person'
                                size={25}
                            />
                        </View>
                        <View style={{flex: 8}}>
                            <TextInput placeholder='用户名/邮箱'
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => {
                                           this.state.userName = text;
                                       }}
                            />
                        </View>
                    </View>
                    <View style={styles.rowView}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Icon
                                color='#b7e9de'
                                name='md-lock'
                                size={25}
                            />
                        </View>
                        <View style={{flex: 8}}>
                            <TextInput placeholder='登陆密码'
                                       underlineColorAndroid='transparent'
                                       secureTextEntry={true}
                                       onChangeText={(text) => {
                                           this.state.password = text;
                                       }}
                            />
                        </View>
                    </View>
                    <Button
                        children={'登录'}
                        onPress={() => this.onSelectLogin()}/>
                  </View>
                  <View  style={styles.bottomView}>
                      <View style={{flex:1}}>
                           <Text style={styles.loginLeftText} onPress={this.registerClick} >邮箱注册</Text>
                      </View>
                      <View style={{flex:1}}>
                           <Text style={styles.loginRightText} onPress={this.forgetClick} >忘记密码？</Text>
                      </View>
                  </View>
            </View>
        )
    }
    registerClick = () => {
        const { routes } = this.context;
        routes.register();
    }
    forgetClick = () => {
        const { routes } = this.context;
        routes.forgetPassword();
    }
}

const styles = StyleSheet.create({
    loginview: {
        flex: 1,
        padding: 30,
        backgroundColor: '#ffffff',
    },
    rowView: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomColor: "#f1f1f1",
        borderBottomWidth: 1
    },
    loginImage:{
        flexDirection: 'row',
        height:100,
        marginTop:1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom:10
    },
    sureBtn: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#b7e9de'
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    },
    loginLeftText: {
        color:"#e9920e",
        textAlign:'left'
    },
    loginRightText: {
        color:"#e9920e",
        textAlign:'right'
    },
    bottomView: {
        flexDirection: 'row',
        marginTop: 10,
    }
});
Login.propTypes = propTypes;
Login.contextTypes = contextTypes;

export default Login;
