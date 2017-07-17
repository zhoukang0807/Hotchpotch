import React, {Component, PropTypes} from 'react';
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
    NativeAppEventEmitter,
    InteractionManager
} from 'react-native';
import Button from '../../components/Button';
import Pomelo from 'react-native-pomelo';
import {request} from '../../utils/RequestUtil';
import NavigationUtil from '../../utils/NavigationUtil';
import {REQUSET_ADD_FRIEND} from '../../constants/Urls';
import { toastShort } from '../../utils/ToastUtil';
export default class SureFriend extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '新朋友',
    });

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            newFriends: [],
            confirmUsers:[],
            rejectUsers:[],
        };
        this.onSelectConfirm=this.onSelectConfirm.bind(this);
        this.onSelectRejectt=this.onSelectRejectt.bind(this);
        this._renderRow=this._renderRow.bind(this);

    }

    componentWillMount() {
        this.state.confirmUsers=[];
        this.state.rejectUsers=[];
        InteractionManager.runAfterInteractions(() => {
            const {loginInfo} = this.props.navigation.state.params;
            Pomelo.request("chat.chatHandler.getNewFriend", {
                from: loginInfo.userName,
            }, function (data) {
                this.setState({newFriends: data.requets});
            }.bind(this));
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    onSelectConfirm(row) {
        const {loginInfo,contactActions} = this.props.navigation.state.params;
        let users=this.state.confirmUsers;
        request(REQUSET_ADD_FRIEND + "?form=" + loginInfo.userName + "&receiver=" + row.userName, 'get').then(function (data) {
            if (data.resultCode == "0000") {
                Pomelo.request("chat.chatHandler.cleanFriend", {
                    from: loginInfo.userName,
                    receiver: row.userName,
                }, function (data) {
                    users.push(data.userName);
                    this.setState({rejectUsers:users})
                }.bind(this));
                contactActions.requestContactList(loginInfo.userId);
            }
        }.bind(this))
    }

    onSelectRejectt(row) {
        const {loginInfo} = this.props.navigation.state.params;
        let users=this.state.rejectUsers;
        Pomelo.request("chat.chatHandler.cleanFriend", {
            from: loginInfo.userName,
            receiver: row.userName,
        }, function (data) {
            users.push(data.userName);
            this.setState({rejectUsers:users})
        }.bind(this));
    }
    renderSureButton(isConfirm,isReject,data){
        if(isConfirm && isReject){
            return (
                <View style={{flex:1,flexDirection:"row"}}>
                    <Button
                        containerStyle={[styles.sureBtn, {backgroundColor: '#66e964'}]}
                        style={styles.btnText}
                        text={'接受'}
                        onPress={() => this.onSelectConfirm(data)}/>
                    <Button
                        containerStyle={[styles.sureBtn, {backgroundColor: "#fe2f11"}]}
                        style={styles.btnText}
                        text={'拒绝'}
                        onPress={() => this.onSelectRejectt(data)}/>
                </View>
            );
        }else if(!isConfirm){
            return (
                <View style={{flex:1,flexDirection:"row"}}>
                    <Button
                        containerStyle={[styles.sureBtn, {backgroundColor: '#c3c9bf'}]}
                        style={styles.btnText}
                        text={'已接受'} />
                </View>
            );
        }else if(!isReject){
            return (
                <View style={{flex:1,flexDirection:"row"}}>
                    <Button
                        containerStyle={[styles.sureBtn, {backgroundColor: '#c3c9bf'}]}
                        style={styles.btnText}
                        text={'已拒绝'} />
                </View>
            );
        }

    }
    _renderRow(data) {
        const isConfirm = this.state.confirmUsers.indexOf(data.userName)==-1;
        const isReject = this.state.rejectUsers.indexOf(data.userName)==-1;
        return (
            <View style={{paddingTop: 1}}>
                    <View style={[styles.row, styles.last]}>
                        <Image style={styles.logo} source={{uri: data.avatar}}/>
                        <View style={styles.content}>
                            <View style={[styles.crow]}>
                                <Text style={styles.title}
                                      numberOfLines={1}>{data.userName}</Text>
                            </View>
                        </View>
                        {this.renderSureButton(isConfirm,isReject,data)}

                    </View>
            </View>
        )
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource.cloneWithRows(this.state.newFriends)}
                renderRow={this._renderRow.bind(this)}
                enableEmptySections={true}
            />
        );
    }
}
const width = Dimensions.get('window').width;
const px = 9;
const borderWidth = StyleSheet.hairlineWidth;
const styles = StyleSheet.create({
    row: {
        paddingLeft: px,
        paddingVertical: px,
        borderBottomWidth: borderWidth,
        borderBottomColor: '#c9c9c9',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 1,
        backgroundColor: '#fff',

    },
    last: {
        borderBottomWidth: 0,
    },

    logo: {
        width: 50,
        height: 50,
        marginRight: px,
        borderRadius: 8
    },
    content: {
        flexDirection: "column",
        justifyContent: 'center',
        height: 45,
        marginRight: 3,
        flex: 1
    },
    crow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 17,
        lineHeight: 19,
        overflow: 'hidden',
        color: '#333333'
    },
    sureBtn: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    },
});
