import React, {PropTypes} from 'react';
import {
    InteractionManager,
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    TextInput,
    BackHandler,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import {uploadImage} from '../utils/RequestUtil';
import {UPLOAD_AVATAR} from '../constants/Urls';
import { toastShort } from '../utils/ToastUtil';
import NavigationUtil from '../utils/NavigationUtil';
import ImagePicker from 'react-native-image-crop-picker';

class About extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '我',
        tabBarLabel: '我',
        tabBarIcon: ({tintColor}) => (
            <Icon name="md-person" size={25} color={tintColor} />
        ),
    });

    constructor(props) {
        super(props);
        this.state = {
            loginInfo:{}
        };
        this.onloginOut=this.onloginOut.bind(this);
    }

//组件出现前 就是dom还没有渲染到html文档里面
    componentWillMount() {

    }

//组件渲染完成 已经出现在dom文档里
    componentDidMount() {
        store.get('loginInfo').then((loginInfo) => {
            this.setState({loginInfo:loginInfo});
        });
    }

    //官方的解释是组件被移除前执行
    componentWillUnmount() {

    }

    goBack() {

    }

    onloginOut() {
            store.delete("loginInfo")
            NavigationUtil.reset(this.props.navigation, 'Login');
    }
    openPicker(){
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true
        }).then(image => {
            uploadImage(UPLOAD_AVATAR,image,this.state.loginInfo.userName).then(function (data) {
                  let result = JSON.parse(data);
                  if(result.resultCode=="0000"){
                      let loginInfo = this.state.loginInfo;
                      loginInfo.avatar = result.avatar;
                      this.setState({loginInfo:loginInfo});
                      alert(result.avatar);
                      store.save('loginInfo',loginInfo).then(function (err,res) {
                        console.log(arguments)
                      });
                  }else{
                      toastShort(result.resultDesc)
                  }
            }.bind(this)).catch(function (err) {
                toastShort(JSON.stringify(err))
            })
        });
    }
    render() {
        const {loginInfo} = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={1} onPress={()=>this.openPicker()}>
                <View style={styles.rowView}>
                    <Image style={styles.image} source={{uri: loginInfo.avatar}}/>
                    <View style={styles.textView}>
                        <Text
                            style={styles.text1}>{loginInfo.nickName}</Text>
                        <Text style={styles.text}>账号：{loginInfo.userName}</Text>
                    </View>
                </View>
                </TouchableOpacity>
                <View style={styles.rowView2}>
                    <Text style={styles.text2}>个人签名:</Text>
                    <Text style={styles.text}>{loginInfo.sign}</Text>
                </View>
                <Button
                    containerStyle={styles.sureBtn}
                    style={styles.btnText}
                    text={'退出登录'}
                    onPress={() => this.onloginOut()}
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
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: "#FFF"
    },
    rowView2: {
        height:50,
        marginTop: 20,
        paddingLeft: 10,
        flexDirection: 'row',
        backgroundColor: "#FFF",
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        margin: 10,
        borderRadius: 8
    },
    textView: {
        margin: 10,
        left: 20,
    },
    text1: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    text2: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 14
    },
    sureBtn: {
        margin: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fe2f11'
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    },
});

export default About;
