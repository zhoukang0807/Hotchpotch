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
import Pomelo from 'react-native-pomelo';
const propTypes = {
    chatActions: PropTypes.object,
};

const contextTypes = {
    routes: PropTypes.object.isRequired
};
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
//组件出现前 就是dom还没有渲染到html文档里面
    componentWillMount() {
    }
//组件渲染完成 已经出现在dom文档里
    componentDidMount() {
        const { chatActions } = this.props;
        store.get('loginInfo').then((loginInfo) => {
            chatActions.requestChat(loginInfo.userId,loginInfo.userName);
        })
    }

    //官方的解释是组件被移除前执行
    componentWillUnmount() {
    }
    render() {
        InteractionManager.runAfterInteractions(() => {
            // ...耗时较长的同步的任务...避免影响动画
            store.get('loginInfo').then((loginInfo) => {
            })
        });
        return(
            <View>
                <Text>聊天页面</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({

});
Chat.propTypes = propTypes;
Chat.contextTypes = contextTypes;

export default Chat;
