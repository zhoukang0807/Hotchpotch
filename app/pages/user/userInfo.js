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
                    NavigationUtil.reset(this.props.navigation, 'Home',{loginInfo});
                }})
        });

        const { login } = this.props;
        return(
            <View style={styles.container}>

                    <Button
                        containerStyle={styles.sureBtn}
                        style={styles.btnText}
                        text={'发消息'}
                        onPress={() => this.onSelectLogin()}
                    />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowView: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomColor: "#f1f1f1",
        borderBottomWidth: 1
    },
    sureBtn: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#4cb03e'
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    },
});
Login.propTypes = propTypes;

export default Login;
