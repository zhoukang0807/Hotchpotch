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
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import TimerButton from '../../components/TimerButton';
import FetchLoading from '../../components/fetchLoading';
import {toastShort} from '../../utils/ToastUtil';
import {IsEmail} from '../../utils/utilt';
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
            email: "",
            verifyCode: "",
            repassword:""
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
            titleStyle: {color: '#fff', fontSize: 20},
            navigationBarStyle: {backgroundColor: "#b7e9de"}
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

    goBack() {
    }

    onSelectRegister() {
        const {registerActions} = this.props;
        if (this.state.userName == "" || this.state.password == "" || this.state.email == "" || this.state.verifyCode == ""||this.state.repassword =="") {
            toastShort("用户名、密码、验证码或邮箱不能为空!"); //toastShort安卓内提示用。提示错误信息
            return;
        }
        if(this.state.password !== this.state.repassword){
            toastShort("两次输入的密码不一致，请重新输入！");
            return;
        }

        registerActions.requestRegister(this.state.userName, this.state.password, this.state.email, this.state.verifyCode);
    }

    _requestSMSCode(shouldStartCountting) {
        const {sendEmailActions} = this.props;
        if (this.state.email == "" || !IsEmail(this.state.email)) {
            toastShort("邮箱格式不正确！");
            shouldStartCountting(false);
            return;
        }
        sendEmailActions.requestSendEmail(this.state.email, shouldStartCountting);
    }

    render() {
        const {register, sendEmail} = this.props;
        let loading = sendEmail.loading ? sendEmail.loading : register.loading;
        let tips = sendEmail.loading ? "请求中..." : "注册中...";
        return (
            <View style={styles.loginview}>
                <FetchLoading showLoading={loading} tips={tips}/>
                <View style={styles.rowView}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon
                            color='#b7e9de'
                            name='md-mail'
                            size={25}
                        />
                    </View>
                    <View style={{flex: 6}}>
                        <TextInput placeholder='请输入邮箱'
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) => {
                                       this.state.email = text;
                                   }}
                        />
                    </View>
                    <TimerButton enable={5}
                                 style={{width: 80, marginRight: 0, marginTop: 12, marginBottom: 12}}
                                 textStyle={{color: "#ffffff"}}
                                 timerCount={60}
                                 onClick={(shouldStartCountting) => {
                                     this._requestSMSCode(shouldStartCountting)
                                 }}/>
                </View>
                <View style={styles.rowView}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon
                            color='#b7e9de'
                            name='md-umbrella'
                            size={25}
                        />
                    </View>
                    <View style={{flex: 8}}>
                        <TextInput placeholder='请输入邮箱验证码'
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) => {
                                       this.state.verifyCode = text;
                                   }}
                        />
                    </View>
                </View>
                <View style={styles.rowView}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon
                            color='#b7e9de'
                            name='md-person'
                            size={25}
                        />
                    </View>
                    <View style={{flex: 8}}>
                        <TextInput placeholder='请输入用户名'
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
                        <TextInput placeholder='请输入密码'
                                   underlineColorAndroid='transparent'
                                   secureTextEntry={true}
                                   onChangeText={(text) => {
                                       this.state.password = text;
                                   }}
                        />
                    </View>
                </View>
                <View style={styles.rowView}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon
                            color='#b7e9de'
                            name='md-refresh-circle'
                            size={25}
                        />
                    </View>
                    <View style={{flex: 8}}>
                        <TextInput placeholder='请再次输入密码'
                                   underlineColorAndroid='transparent'
                                   secureTextEntry={true}
                                   onChangeText={(text) => {
                                       this.state.repassword = text;
                                   }}
                        />
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <View style={{flex: 1}}>
                        <Button
                            containerStyle={styles.sureBtn}
                            style={styles.btnText}
                            text={'注册'}
                            onPress={() => this.onSelectRegister()}/>
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
        backgroundColor: '#b7e9de'
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    },
    rowView: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomColor: "#f1f1f1",
        borderBottomWidth: 1
    },
    bottomView: {
        flexDirection: 'row',
        marginTop: 10,
    }

});
Register.propTypes = propTypes;
Register.contextTypes = contextTypes;

export default Register;
