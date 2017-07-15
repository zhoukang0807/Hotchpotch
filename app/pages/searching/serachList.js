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
    TouchableHighlight,
    Dimensions
} from 'react-native';
import { toastShort } from '../../utils/ToastUtil';
import Icon from 'react-native-vector-icons/Ionicons';


class SerachList extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '探索',
        tabBarLabel: '探索',
        tabBarIcon: ({tintColor}) => (
            <Icon name="md-eye" size={25} color={tintColor} />
        ),
    });

    constructor(props) {
        super(props);
        this.state = {};
    }

//组件出现前 就是dom还没有渲染到html文档里面
    componentWillMount() {
    }

//组件渲染完成 已经出现在dom文档里
    componentDidMount() {
    }

    //官方的解释是组件被移除前执行
    componentWillUnmount() {
    }

    onReadTap(row) {
        if(row.tag=="sweep"){
            toastShort("该功能正在开发中！");
        }
        const {navigate} = this.props.navigation;;
        navigate(row.tag);
    }

    renderIteam(row) {
        return(
            <View  key={row.tag}  style={{marginTop:5}}>
            <TouchableHighlight onPress={()=>this.onReadTap(row)}>
            <View style={styles.rowView}>
                <View style={styles.image}>
                    <Icon
                        color={row.color}
                        name={row.icon}
                        size={50}
                    />
                </View>
                <View style={styles.textView}>
                    <Text
                        style={styles.text}>{row.tabLable}</Text>
                </View>
            </View>
        </TouchableHighlight>
            </View>
                );

    }

    render() {
        const rowData=[{
            tabLable:"新闻",
            tag:"Read",
            icon:"md-planet",
            color:"#fdff39"
        },{
            tabLable:"作者的博客",
            tag:"BlogView",
            icon:"md-paw",
            color:"#2eaaa4"
        },{
            tabLable:"扫一扫",
            tag:"sweep",
            icon:"md-qr-scanner",
            color:"#2d2d2d"
        }];
        return (  <View style={styles.container}>
            {rowData.map((row) => {return this.renderIteam(row);})}
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowView: {
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
    },
    textView: {
        margin: 10,
        left: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default SerachList;
