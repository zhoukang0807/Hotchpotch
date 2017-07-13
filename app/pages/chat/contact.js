import React, { Component,PropTypes} from 'react';
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
const propTypes = {
    contactActions: PropTypes.object,
    contact: PropTypes.object.isRequired
};
export default class Contact extends Component {
    constructor (props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
    }
    componentDidMount() {
        store.get('loginInfo').then((loginInfo) => {
            const { contactActions } = this.props;
            contactActions.requestContactList(loginInfo.userId);
        });
    }
    componentWillUnmount() {
    }
    onRowTap(data){
        const {navigate} = this.props.navigation;
        navigate('ContactInfo',{contactInfo:data});
    }
    _renderRow(data){
        return (
            <View style={{paddingTop:1}}>
                <TouchableHighlight  onPress={()=>this.onRowTap(data)}>
                    <View style={[styles.row,styles.last]}>
                        <Image style={styles.logo} source={{uri:"https://facebook.github.io/react/img/logo_og.png"}} />
                        <View style={styles.content}>
                            <View style={[styles.crow]}>
                                <Text style={styles.title} numberOfLines={1}>{data.remark?data.remark:data.nickName?data.nickName:data.userName}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
    render() {
        const {contact} =this.props;

        return (
            <ListView
                dataSource={this.state.dataSource.cloneWithRows(contact.contacts)}
                renderRow={this._renderRow.bind(this)}
                enableEmptySections={true}
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
Contact.propTypes = propTypes;