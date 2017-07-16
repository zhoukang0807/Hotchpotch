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
    NativeAppEventEmitter
} from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
import Pomelo from 'react-native-pomelo';
const propTypes = {
    contactActions: PropTypes.object,
    contact: PropTypes.object.isRequired
};
export default class Contact extends Component {
    constructor(props) {
        super(props);
        var ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource1: ds1.cloneWithRows([]),
            dataSource2: ds2.cloneWithRows([]),
            hasTip:false
        };
        this.renderNewFriendTip=this.renderNewFriendTip.bind(this);
        this.onSureFriend=this.onSureFriend.bind(this);
    }

    componentDidMount() {
        store.get('loginInfo').then((loginInfo) => {
            const {contactActions} = this.props;
            contactActions.requestContactList(loginInfo.userId);
        });
        Pomelo.on('onAddFriend', function (data) {
            if(data.hasTip){
                this.setState({hasTip:data.hasTip});
            }
        }.bind(this));
    }

    componentWillUnmount() {
    }

    onRowTap(data) {
        const {navigate} = this.props.navigation;
        navigate('ContactInfo', {contactInfo: data});
    }
    onSureFriend(){
        const {navigate} = this.props.navigation;
        store.get('loginInfo').then((loginInfo) => {
            navigate('SureFriend',{loginInfo});
        });
        this.setState({hasTip:false});
    }
    _renderRow(data) {
        return (
            <View style={{paddingTop: 1}}>
                <TouchableHighlight onPress={() => this.onRowTap(data)}>
                    <View style={[styles.row, styles.last]}>
                        <Image style={styles.logo} source={{uri: data.avatar}}/>
                        <View style={styles.content}>
                            <View style={[styles.crow]}>
                                <Text style={styles.title}
                                      numberOfLines={1}>{data.remark ? data.remark : data.nickName ? data.nickName : data.userName}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
    renderNewFriendTip(){
        if(this.state.hasTip==true){
            return (  <View style={styles.badge}>
                <Icon
                    color='#FE771E'
                    name='md-notifications-outline'
                    size={35}
                />
            </View>);
        }else{
            return <View/>;
        }

    }
    render() {
        const {contact} = this.props;
        return (
        <View style={{flex:1}}>
            <TouchableOpacity onPress={() => this.onSureFriend()}>
                <View style={styles.rowView}>
                    <View style={styles.image}>
                        <Icon
                            color='#FFF'
                            name='md-person-add'
                            size={35}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Text
                            style={styles.text}>新的朋友</Text>
                    </View>
                    {this.renderNewFriendTip()}
                </View>
            </TouchableOpacity>
            <ScrollableTabView
                renderTabBar={() =>
                    <DefaultTabBar tabStyle={styles.tab} textStyle={styles.tabText} />}
                tabBarBackgroundColor="#fcfcfc"
                tabBarUnderlineStyle={styles.tabBarUnderline}
                tabBarActiveTextColor="#3e9ce9"
                tabBarInactiveTextColor="#aaaaaa"
            >
                <View tabLabel="好友">
                    <ListView
                        dataSource={this.state.dataSource1.cloneWithRows(contact.contacts)}
                        renderRow={this._renderRow.bind(this)}
                        enableEmptySections={true}
                    />
                </View>
                <View tabLabel="群组">
                    <ListView
                        dataSource={this.state.dataSource2}
                        renderRow={this._renderRow.bind(this)}
                        enableEmptySections={true}
                    />
                </View>
            </ScrollableTabView>
        </View>
        );
    }
}
const width = Dimensions.get('window').width;
const px = 9;
const borderWidth = StyleSheet.hairlineWidth;
const styles = StyleSheet.create({
    list: {

        borderTopWidth: borderWidth,
        borderTopColor: '#fafafa',
        borderBottomWidth: borderWidth,
        borderBottomColor: '#fafafa',
    },
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
    time: {
        fontSize: 10,
        color: "#9d9d9e",
    },
    desc: {
        fontSize: 13,
        color: '#9d9d9e',
        overflow: 'hidden'
    },
    rowBack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    line: {
        height: borderWidth,
        width: width - 8,
        backgroundColor: '#c9c9c9',
        marginLeft: 8
    },
    deleteBtn: {
        height: 67,
        width: 75,
        backgroundColor: '#d82617',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabIcon: {
        width: 26,
        height: 26
    },
    badge: {
        position: 'absolute',
        right: 10,
        top: 10
    },tab: {
        paddingBottom: 0
    },
    tabText: {
        fontSize: 16
    },
    tabBarUnderline: {
        backgroundColor: '#3e9ce9',
        height: 2
    },
    rowView: {
        marginTop: 5,
        marginBottom:5,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#FFF"
    },
    image: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        marginLeft:10,
        borderRadius: 8,
        backgroundColor:"#fe7218"
    },
    textView: {
        margin: 10,
        left: 10,
        marginLeft: 0,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    },
});
Contact.propTypes = propTypes;