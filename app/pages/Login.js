import React, { PropTypes } from 'react';
import {
    InteractionManager,
    StyleSheet,
    View,
    Text,
    Image,
    Alert
} from 'react-native';
import store from 'react-native-simple-store';
import EditView from '../components/EditView';
import Button from '../components/Button';
import FetchLoading from '../components/fetchLoading';
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
    //构造函数，用来初始化数据
    constructor(props) {
        super(props); //在子类constructor中，super代表父类的constructor.bind(this)。是个函数。
        this.state = {
            userName: "",
            password : "",
        };
    }
//组件出现前 就是dom还没有渲染到html文档里面
    componentWillMount() {
        store.delete('loginInfo')
    }
//组件渲染完成 已经出现在dom文档里
    componentDidMount() {
        Actions.refresh({
            title: "登陆",
            titleStyle:{ color: '#808080',fontSize: 20},
            navigationBarStyle:{backgroundColor:"#f2f2f2"}
        });
    }
    //官方的解释是组件被移除前执行
    componentWillUnmount() {
    }
    onSelectLogin() {
        const { loginActions } = this.props;
        loginActions.requestLogin(this.state.userName,this.state.password);
    }
    render() {
        InteractionManager.runAfterInteractions(() => {
            // ...耗时较长的同步的任务...避免影响动画
            store.get('loginInfo').then((loginInfo) => {
                 if(loginInfo){
                     if(loginInfo.resultCode=="0000"){
                         const { routes } = this.context;
                         store.save('user', loginInfo.user);
                         //store.save('isInit', false);
                         routes.initCategory({ isFirst: true });
                     }
                 }
            })
        });

        const { login } = this.props;
        return(
            <View style={styles.loginview}>
                <FetchLoading  showLoading={login.showLoading}/>
                <View   style={styles.loginImage}>
                    <Image source={require('../img/login.png')}/>
                </View>
                <View style={{marginTop:80}}>
                    <EditView  name='请输入用户名/注册邮箱：' onChangeText={(text) => {
                        this.state.userName = text;
                    }}/>
                    <EditView name='请输入密码：' onChangeText={(text) => {
                        this.state.password = text;
                    }}/>
                    <Button
                        containerStyle={styles.sureBtn}
                        style={styles.btnText}
                        text={'登录'}
                        onPress={() => this.onSelectLogin()}/>
                  </View>
                  <View  style={styles.rowView}>
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
        alert("点击了忘记密码")
    }
}

const styles = StyleSheet.create({
    loginview: {
        flex: 1,
        padding: 30,
        backgroundColor: '#ffffff',
    },
    rowView:{
        flexDirection: 'row',
        marginTop:10
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
        backgroundColor: '#3e9ce9'
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    },
    loginLeftText: {
        color:"#4A90E2",
        textAlign:'left'
    },
    loginRightText: {
        color:"#4A90E2",
        textAlign:'right'
    }
});
Login.propTypes = propTypes;
Login.contextTypes = contextTypes;

export default Login;
