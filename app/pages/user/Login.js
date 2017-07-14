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
import NavigationUtil from '../../utils/NavigationUtil';
const propTypes = {
    loginActions: PropTypes.object,
    login: PropTypes.object.isRequired
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
    }
//组件渲染完成 已经出现在dom文档里
    componentDidMount() {
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
                    NavigationUtil.reset(this.props.navigation, 'Home');
                }})
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
                                color='#595959'
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
                                color='#595959'
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
                        containerStyle={styles.sureBtn}
                        style={styles.btnText}
                        text={'登录'}
                        onPress={() => this.onSelectLogin()}/>
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
        alignItems: 'flex-start'
    },
    sureBtn: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#595959'
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    },
    loginLeftText: {
        color:"#595959",
        textAlign:'left'
    },
    loginRightText: {
        color:"#595959",
        textAlign:'right'
    },
    bottomView: {
        flexDirection: 'row',
        marginTop: 10,
    }
});
Login.propTypes = propTypes;

export default Login;
