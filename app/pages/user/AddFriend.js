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
    ListView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import FetchLoading from '../../components/fetchLoading';
import {toastShort} from '../../utils/ToastUtil';
import store from 'react-native-simple-store';
import { FRIEND_LIST } from '../../constants/Urls';

import {
    Actions
} from 'react-native-router-flux';

const contextTypes = {
    routes: PropTypes.object.isRequired
};
import { request } from '../../utils/RequestUtil';

class AddFriend extends React.Component {
    //构造函数，用来初始化数据
    constructor(props) {
        super(props); //在子类constructor中，super代表父类的constructor.bind(this)。是个函数。
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            friendName: "",
            displayView:true,
            selectedUserName:"",
            modalVisible: false,
            msg:"",
            remark:""
        };
        this.goBack = this.goBack.bind(this);
        this.search = this.search.bind(this);
    }

    //组件出现前 就是dom还没有渲染到html文档里面
    componentWillMount() {
        //添加回退按键监听
    }

//组件渲染完成 已经出现在dom文档里
    componentDidMount() {
        //删除回退按键监听
        Actions.refresh({
            title: "添加好友",
            titleStyle: {color: '#fff', fontSize: 20},
            navigationBarStyle: {backgroundColor: "#340F19"}
        });
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }

    goBack() {
    }

    setModalVisible(visible,selectedUserName) {
        this.setState({modalVisible: visible,selectedUserName:selectedUserName,displayView: true});
    }

    search(friendName){
        const {addFriendActions} = this.props;
        if(friendName){
            store.get('loginInfo').then((loginInfo) => {
                addFriendActions.requestQueryUser(loginInfo.userName,friendName);
            })
        }else{
            toastShort("请输入用户名")
        }
    }

    addFriend(){

        store.get('loginInfo').then((loginInfo) => {
            request(FRIEND_LIST,"post",JSON.stringify({userName:loginInfo.userName})).then(function (friends) {
                if(friends.data.indexOf(this.state.selectedUserName)==-1) {
                    global.socketStore.socket.emit('addFriend', {
                        from: loginInfo.userName,
                        target: this.state.selectedUserName,
                        msg:this.state.msg,
                        remark:this.state.remark,
                        reqTime:new Date().Format("yyyy-MM-dd hh:mm:ss")
                    });
                    toastShort("请求已发送");
                    this.setModalVisible(false,"")
                }else{
                    toastShort("他已经是您的好友了");
                    this.setModalVisible(false,"")
                }
            }.bind(this))
        })
    }

    renderFriendList(dataSource){
        const {addFriend} = this.props;
        if(addFriend.friendNames.length==0){
            return (
                <Text></Text>
            );
        }
        return (
        <ListView
            dataSource={dataSource}
            renderRow={(rowData) => {
                return (
                    <View >
                        <TouchableOpacity
                            onPress={() =>{ this.setModalVisible(true,rowData) }}
                            underlayColor="rgb(210,230,255)"
                            activeOpacity={0.5}
                            style={{borderRadius: 8, padding: 0, marginTop: 0}}>
                            <View>
                                <View style={styles.row}>
                                    <View style={{flex: 1, flexDirection: 'column',}}>
                                        <View style={{flexDirection: 'row',}}>
                                            <Text style={{
                                                flex: 2,
                                                fontSize: 16,
                                                paddingTop: 10,
                                                paddingLeft: 5,
                                                borderBottomColor: 'red'
                                            }}>{rowData}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.separator}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }
            }
        />
        )
    }

    render() {
        const {addFriend} = this.props;
        const loading =addFriend?addFriend.loading:false;
        let tips = "搜索..."
        return (
            <View style={styles.loginview}>
                <FetchLoading showLoading={loading} tips={tips}/>
                <View style={styles.rowView}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon
                            color='#b7e9de'
                            name='md-person-add'
                            size={25}
                        />
                    </View>
                    <View style={{flex: 6}}>
                        <TextInput placeholder='请输入用户名'
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) => {
                                       this.state.friendName = text;
                                   }}
                        />
                    </View>
                    <View style={styles.bottomView}>
                            <Button
                                children={'搜索'}
                                onPress={() =>
                                    this.search(this.state.friendName)
                                }/>
                    </View>
                </View>
                {this.renderFriendList(this.state.dataSource.cloneWithRows(addFriend.friendNames))}

                <Modal
                    animationType="slide"
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={() => {this.setModalVisible(false,"")}}
                >
                    <View style={styles.loading}>
                        <View style={styles.modalTitle}>
                            <Icon
                                color='#b7e9de'
                                name='md-close'
                                size={20}
                                onPress={() =>
                                    this.setModalVisible(false,"")}
                            />
                        </View>
                        <View style={this.state.displayView?styles.modalView:styles.modalView2}  >
                            <View >
                                <View style={styles.rowView}>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon
                                            color='#b7e9de'
                                            name='md-person-add'
                                            size={25}
                                            onPress={()=>this.setState({displayView: !this.state.displayView})}
                                        />
                                    </View>
                                    <View style={{flex: 6 , flexDirection: 'row',}}>
                                        <Text style={{flex:8}} onPress={()=>this.setState({displayView: !this.state.displayView})}>添加好友</Text>
                                        <View style={{flex:1}}>
                                            {this.state.displayView?
                                                <Icon
                                                    color='#b7e9de'
                                                    name='md-arrow-down'
                                                    size={25}
                                                    onPress={()=>this.setState({displayView: !this.state.displayView})}
                                                />
                                              : <Icon
                                                    color='#b7e9de'
                                                    name='md-arrow-up'
                                                    size={25}
                                                    onPress={()=>this.setState({displayView: !this.state.displayView})}
                                                />
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {
                                this.state.displayView ? null : (
                                    <View>
                                        <View style={styles.rowView}>
                                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                <Icon
                                                    color='#b7e9de'
                                                    name='md-mail'
                                                    size={25}
                                                />
                                            </View>
                                            <View style={{flex: 8}}>
                                                <TextInput placeholder='发送验证申请,等待通过'
                                                           underlineColorAndroid='transparent'
                                                           onChangeText={(text) => {
                                                               this.state.msg = text;
                                                           }}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.rowView}>
                                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                <Icon
                                                    color='#b7e9de'
                                                    name='md-bookmark'
                                                    size={25}
                                                />
                                            </View>
                                            <View style={{flex: 8}}>
                                                <TextInput placeholder='为好友设置备注'
                                                           underlineColorAndroid='transparent'
                                                           onChangeText={(text) => {
                                                               this.state.remark = text;
                                                           }}
                                                />
                                            </View>
                                        </View>
                                        <Button
                                            children={'发送验证信息'}
                                            onPress={() => this.addFriend()}/>
                                    </View>
                                )
                            }

                            <View >
                                <View style={styles.rowView}>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon
                                            color='#b7e9de'
                                            name='md-eye'
                                            size={25}
                                            onPress={()=>alert("查看好友信息")}
                                        />
                                    </View>
                                    <View style={{flex: 6}}>
                                        <Text onPress={()=>alert("查看好友信息")}>详细信息(未完成)</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

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
        flex: 2
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        flex: 1,
    },
    modalTitle:{
        paddingRight:4,
        alignItems:"flex-end",
        justifyContent: 'center',
        backgroundColor:"#99c3ac",
        width:300,
        height:30,
    },
    modalView: {
        width:300,
        height:80,
        marginBottom: 10,
        backgroundColor:"#fff",
        borderColor:"#e1e1e1",
        borderWidth:1
    },
    modalView2: {
        width:300,
        height:200,
        marginBottom: 10,
        backgroundColor:"#fff",
        borderColor:"#e1e1e1",
        borderWidth:1
    }
});

export default AddFriend;
