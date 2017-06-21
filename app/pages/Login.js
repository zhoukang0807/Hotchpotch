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
    Text,
    View,
    Button,
    TextInput,
    DeviceEventEmitter,
    ScrollView,
    RefreshControl,
    Alert
} from 'react-native';
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
            <View>
            <View style={{marginTop:80}}>
                <TextInput style={{height: 40}} placeholder="输入用户名/注册手机号"
                           onChangeText={(text) =>  {this.userName = text;}}
                />
                <TextInput style={{height: 40}} placeholder="输入密码" onChangeText={(text) =>  {this.password = text;}}
                />
                <Button
                    onPress={() => this.onSelectLogin()}
                    title="登录"
                    color="#4A90E2"
                />
                <Text style={{color:"#4A90E2",textAlign:'center',marginTop:10}} >忘记密码？</Text>
            </View>
        </View>
        )
    }
    onPressCallback = () => {
    };
}

const styles = StyleSheet.create({
});
Login.contextTypes = contextTypes;

export default Login;
