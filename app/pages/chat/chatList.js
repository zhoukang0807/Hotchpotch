import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    Platform,
    ListView,
    InteractionManager,
    NativeAppEventEmitter
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import store from 'react-native-simple-store';
import Pomelo from 'react-native-pomelo';
export default class ChatList extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '消息',
        tabBarLabel: '消息',
        tabBarIcon: ({tintColor}) => (
        <Icon name="md-alert" size={25} color={tintColor} />
        ),
    });
    constructor (props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            rowOpen:false,
            dataList:[],
            dataSource: ds.cloneWithRows([])
        };

    }
    componentWillMount() {

    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            store.get('loginInfo').then((loginInfo) => {
                Pomelo.request("chat.chatHandler.getChatList", {
                    from: loginInfo.userName,
                }, function (data) {
                    this.setState({
                        dataList:data.chatList
                    });
                }.bind(this));
            });
        });
        Pomelo.on('onRefreshFriend', function (data) {
            this.setState({
                dataList:data
            });
        }.bind(this));

    }
    componentWillUnmount() {
        this.sessionListener && this.sessionListener.remove();
    }
    onRowTap(data){
        const {navigate} = this.props.navigation;
        store.get('loginInfo').then((loginInfo) => {
            navigate('Chat',{loginInfo:loginInfo,sessionData:data});
        });
    }
    _renderRow(data){
        return (
            <View>
                <TouchableHighlight  onPress={()=>this.onRowTap(data)}>
                    <View style={[styles.row,styles.last]}>
                        <Image style={styles.logo} source={{uri:data.avatar}} />
                        <View style={styles.content}>
                            <View style={[styles.crow]}>
                                <Text style={styles.title} numberOfLines={1}>{data.room?data.roomName:data.remark?data.remark:data.nickName}</Text>

                                <Text style={styles.time}> {data.time}</Text>
                            </View>
                            <View style={[styles.crow,{marginTop:3}]}>
                                <Text style={styles.desc} numberOfLines={1}>
                                    {(data.unreadCount > 0 ?'['+data.unreadCount+'条]' : '')+data.content}</Text>
                            </View>
                        </View>
                        {parseInt(data.unreadCount) > 0 ? <View style={styles.badge}/> : null}
                    </View>
                </TouchableHighlight>

            </View>
        )
    }
    delete(res){
        alert(res);
    }
    _renderSeparator(){
        return (
            <View style={styles.line}/>
        );
    }
    _renderHiddenRow(res,index){
        return(
            <View style={styles.rowBack}>
                <TouchableOpacity style={styles.deleteBtn} activeOpacity={1} onPress={()=>this.delete(res)}>
                    <Text style={{color:'#fff'}}>删除</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        return (
                <SwipeListView
                    ref="swList"
                    enableEmptySections
                    style={styles.list}
                    disableRightSwipe
                    recalculateHiddenLayout
                    closeOnRowPress={true}
                    tension={-2}
                    friction={5}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.dataList)}
                    renderRow={this._renderRow.bind(this)}
                    renderSeparator={this._renderSeparator.bind(this)}
                    //renderHiddenRow={this._renderHiddenRow.bind(this)}
                    rightOpenValue={-75}
                    onRowOpen={()=>this.setState({rowOpen:true})}
                    onRowClose={()=>this.setState({rowOpen:false})}
                    swipeToOpenPercent={5}
                />
        );
    }
}
const width= Dimensions.get('window').width;
const px = 9;
const borderWidth = StyleSheet.hairlineWidth;
const styles = StyleSheet.create({
    list:{

        borderTopWidth:borderWidth,
        borderTopColor:'#fafafa',
        borderBottomWidth:borderWidth,
        borderBottomColor:'#fafafa',
    },
    row:{
        paddingLeft:px,
        paddingVertical:px,
        borderBottomWidth:borderWidth,
        borderBottomColor:'#c9c9c9',
        flexDirection:'row',
        alignItems:'center',
        paddingRight:1,
        backgroundColor:'#fff',

    },
    last:{
        borderBottomWidth:0,
    },

    logo:{
        width:50,
        height:50,
        marginRight:px,
        borderRadius:8
    },
    content:{
        flexDirection:"column",
        justifyContent:'center',
        height:45,
        marginRight:3,
        flex:1
    },
    crow:{
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,

        alignItems:'center'
    },
    title:{
        fontSize:17,
        lineHeight:19,
        overflow:'hidden',
        color:'#333333'
    },
    time:{
        fontSize:10,
        color:"#9d9d9e",
    },
    desc:{
        fontSize:13,
        color:'#9d9d9e',
        overflow:'hidden'
    },
    rowBack:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    line:{
        height:borderWidth,
        width:width-8,
        backgroundColor:'#c9c9c9',
        marginLeft:8
    },
    deleteBtn:{
        height:67,
        width:75,
        backgroundColor:'#d82617',
        alignItems:'center',
        justifyContent:'center'
    },
    tabIcon:{
        width:26,
        height:26
    },
    badge:{
        width:10,
        height:10,
        borderRadius:5,
        backgroundColor:'red',
        position:'absolute',
        left:55,
        top:7
    }

});
