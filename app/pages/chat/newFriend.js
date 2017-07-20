import React, { PropTypes } from 'react';
import {
    InteractionManager,
    StyleSheet,
    View,
    ListView,
    Text,
    Image,
    BackHandler,
    Alert,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Modal
} from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import FetchLoading from '../../components/fetchLoading';
import { toastShort } from '../../utils/ToastUtil';

import {
    Actions
} from 'react-native-router-flux';

const contextTypes = {
    routes: PropTypes.object.isRequired
};
class NewFriend extends React.Component {
    constructor(props) {
        super(props);
        const { friends } = this.props;
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            friends:friends?friends:[]
        }
        this.goBack = this.goBack.bind(this);

       global.socketStore.socket.on("reply", function (obj) {
            var friends =this.state.friends;
            var newFriends = []
            for(var i = 0 ; i<friends.length;i++){
                if(JSON.parse(friends[i]).from!=obj.target){
                    newFriends.push(friends[i])
                }
            }
            store.save("newFriend",{
                newFriendCount:newFriends.length,
                newFriends:newFriends
            })
            this.setState({
                friends:newFriends
            },()=>{
                const { set } = this.props;
                set(this.state.friends.length,this.state.friends);
            })

        }.bind(this))
    }
    goBack(){}

    componentDidMount() {
        setTimeout(()=> {
            Actions.refresh({
                title:"新的联系人",
                titleStyle: {color: '#fff', fontSize: 20},
                navigationBarStyle: {backgroundColor: "#340F19"}
            });
        }, 10)
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }
    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }

    reply(target,boolean){
        if(boolean){
            store.get('loginInfo').then((loginInfo) => {
                global.socketStore.socket.emit('reply', {
                    reply:boolean,
                    target:target,
                    from:loginInfo.userName
                });
            })
        }else{
            var friends =this.state.friends;
            var newFriends = []
            for(var i = 0 ; i<friends.length;i++){
                if(JSON.parse(friends[i]).from!=target){
                    newFriends.push(friends[i])
                }
            }
            store.save("newFriend",{
                    newFriendCount:newFriends.length,
                    newFriends:newFriends
                })
            this.setState({
                friends:newFriends
            },()=>{
                const { set } = this.props;
                set(this.state.friends.length,this.state.friends);
            })


        }

    }

    renderContent(dataSource, typeId) {
        if(this.state.friends.length==0){
            return (
                <View style={{ flex:1,
                    justifyContent: 'center',
                    alignItems:'center',
                }}>
                    <Text style={{fontSize:26}}>暂无新的联系人</Text>
                </View>
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
                                onPress={() =>{this.privateChat(rowData.friendUserName)}}
                                underlayColor="rgb(210,230,255)"
                                activeOpacity={0.5}
                                style={{borderRadius: 8, padding: 0, marginTop: 5}}>
                                <View>
                                    <View style={styles.row}>
                                        <Image style={styles.thumb} source={require('../../img/about_logo.png')}/>
                                        <View style={{flex: 1, flexDirection: 'row',}}>
                                            <View style={{flex: 1,flexDirection: 'column',marginLeft:10}}>
                                                <Text style={{
                                                    fontSize: 12,
                                                }}>{JSON.parse(rowData).from}</Text>
                                                <Text style={{
                                                        fontSize: 12,
                                                }}>{JSON.parse(rowData).msg}</Text>
                                            </View>
                                            <Text style={{
                                                flex: 1,
                                                fontSize: 14,
                                            }}>{JSON.parse(rowData).reqTime}</Text>
                                            <View style={{flex: 2,flexDirection: 'row'}}>
                                            <Button children="接受" style={{width: 60,height:30,marginLeft:10}}
                                                onPress={()=>{this.reply(JSON.parse(rowData).from,true)}}
                                            />
                                            <Button children="拒绝" style={{width: 60,height:30,marginLeft:10}}
                                                    onPress={()=>{this.reply(JSON.parse(rowData).from,false)}}
                                            />
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
    render() {
        return(
            <View style={{ flex:1}}>
                {this.renderContent(this.state.dataSource.cloneWithRows(this.state.friends))}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    row: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        height:50
    },
    thumb: {
        width: 48,
        height: 48,
    },
});

export default NewFriend;
