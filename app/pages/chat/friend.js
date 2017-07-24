import React, { PropTypes } from 'react';
import {
    InteractionManager,
    StyleSheet,
    View,
    ListView,
    Text,
    Image,
    Alert,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Modal
} from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/Ionicons';
import FetchLoading from '../../components/fetchLoading';
import { toastShort } from '../../utils/ToastUtil';
import { monitorMessage } from '../../utils/RequestUtil';

import {
    Actions
} from 'react-native-router-flux';
const propTypes = {
    friendActions: PropTypes.object,
};

const contextTypes = {
    routes: PropTypes.object.isRequired
};
export default class Friend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            animationType: 'none',
            modalVisible: false,
            transparent: false,
            newFriendCount:0,
            newFriends:[]
        };
        const { friendActions } = this.props;
        store.get('loginInfo').then((loginInfo) => {
            friendActions.requestFriend(loginInfo.userName);
            global.socketStore.socket.emit("undone",{userName:loginInfo.userName})
            global.socketStore.socket.on("addFriend", function (obj) {
                this.onReceive(obj);
            }.bind(this))
            global.socketStore.socket.on("reply", function () {
                friendActions.requestFriend(loginInfo.userName);
            }.bind(this))
        })
        monitorMessage
    }

    onReceive(obj){
        this.setState((previousState) => {
            const newFriends= previousState.newFriends;
            var newFriends2 = [];
            const nf =JSON.stringify(obj)
            if(newFriends.indexOf(nf)!=-1){
                return
            }else{
               for(var i = 0 ;i<newFriends.length;i++){
                   if(JSON.parse(newFriends[i]).from!=obj.from){
                       newFriends2.push(newFriends[i]);
                   }
               }
            }
            newFriends2.push(nf)
            store.save("newFriend",{
                newFriendCount:newFriends2.length,
                newFriends:newFriends2
            })
            return {
                newFriendCount:newFriends2.length,
                newFriends:newFriends2
            };
        });
    }
//组件出现前 就是dom还没有渲染到html文档里面
    componentWillMount() {

    }
//组件渲染完成 已经出现在dom文档里
    componentDidMount() {
        store.get('newFriend').then((newFriend) => {
            this.setState({
                newFriendCount:newFriend&&newFriend.newFriendCount?newFriend.newFriendCount:0,
                newFriends:newFriend&&newFriend.newFriends?newFriend.newFriends:[]
            })
        })
    }




    renderContent(dataSource, typeId) {
        const {friend} = this.props;
        if(friend.friend.length==0){
            return (
                <Text></Text>
            );
        }
        return (
            <ListView
                dataSource={dataSource}
                renderRow={(rowData) => {
                    console.log(rowData);
                    return (
                        <View >
                            <TouchableOpacity
                                onPress={() =>{this.selectUserInfo(rowData.userName)}}
                                underlayColor="rgb(210,230,255)"
                                activeOpacity={0.5}
                                style={{borderRadius: 8, padding: 0, marginTop: 0}}>
                                <View style={{height:52}}>
                                    <View style={styles.row}>
                                        <Image style={styles.thumb} source={{uri: rowData.avatar}}/>
                                        <View style={{flex: 1, flexDirection: 'column',}}>
                                            <View style={{flexDirection: 'row',}}>
                                                <Text style={{
                                                    marginLeft:3,
                                                    flex: 2,
                                                    fontSize: 16,
                                                }}>{rowData.nick}</Text>
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
        );
    }
    //官方的解释是组件被移除前执行
    componentWillUnmount() {
    }
    newFriend(){
        const { routes } = this.context;
        const  newFriend= {
            friends:this.state.newFriends,
            set:(newFriendCount,newFriends)=>{
                this.setState({
                    newFriendCount:newFriendCount,
                    newFriends:newFriends
                })
                const { friendActions } = this.props;
                store.get('loginInfo').then((loginInfo) => {
                    friendActions.requestFriend(loginInfo.userName);
                })

            }
        }
        routes.NewFriendContainer(newFriend);
    }
    render() {
        const {friend} = this.props;
        return(
            <View>
                <View style={styles.rowView}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon
                            color='#b7e9de'
                            name='md-person-add'
                            size={30}
                            onPress={()=>this.newFriend()}
                        />
                    </View>
                    <View style={{flex: 6 , flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{flex:8,fontSize:20}} onPress={()=>this.newFriend()} >新的朋友</Text>
                        {this.state&&this.state.newFriendCount&&this.state.newFriendCount!=0?
                            <Text style={{flex:1,fontSize:20}} onPress={()=>this.newFriend()}>
                                {this.state.newFriendCount}
                                </Text>
                            :null}
                    </View>
                </View>
                {this.renderContent(this.state.dataSource.cloneWithRows(friend.friend))}
            </View>
        )
    }
    selectUserInfo = (friendUserName) => {
        store.get('loginInfo').then((loginInfo) => {
            const { routes } = this.context;
            const info = {
                loginInfo:loginInfo,
                userName:friendUserName
            }
            routes.info(info);
        })
    }
}

const styles = StyleSheet.create({
    disclaimer: {
        fontSize: 14,
        textAlign: 'center'
    },

    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    thumb: {
        margin:2,
        width: 48,
        height: 48,
    },
    text: {
        flex: 1,
        alignItems: 'center',    //#水平居中
        justifyContent: 'center',//  #垂直居中
        textAlign: 'center',  // #文字水平居中
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
    },
    row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    rowTitle: {
        flex: 1,
        fontWeight: 'bold',
    },
    rowView: {
        height:40,
        flexDirection: 'row',
        marginTop: 10,
        borderBottomColor: "#f1f1f1",
        borderBottomWidth: 1
    },
});
Friend.propTypes = propTypes;
Friend.contextTypes = contextTypes;
