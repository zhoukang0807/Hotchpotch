import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    Platform,
    ListView,
    NativeAppEventEmitter
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FetchLoading from '../../components/fetchLoading';
const propTypes = {
    findActions: PropTypes.object,
    find: PropTypes.object.isRequired
};

class Find extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
        this.renderSelectIteam = this.renderSelectIteam.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    onClickSearch(){
        const { findActions } = this.props;
        const {navigate} = this.props.navigation;;
        findActions.requestFind(this.state.name,navigate);
    }
    renderSelectIteam(isShow) {
        if (isShow) {
            return (
                <TouchableHighlight onPress={() => this.onClickSearch()}>
                    <View style={styles.rowView}>
                        <View style={styles.image}>
                            <Icon
                                color='#FFF'
                                name='md-search'
                                size={35}
                            />
                        </View>
                        <View style={styles.textView}>
                            <Text
                                style={styles.text}>搜一搜（{this.state.name}）</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            );
        } else {
            return (<View></View>);
        }

    }

    render() {
        const { find } = this.props;
        let isShow = this.state.name ? true : false;
        return (
            <View style={{flex: 1}}>
                <FetchLoading  showLoading={find.loading} tips="搜索中..."/>
                <View style={[styles.rowView,{marginBottom:20}]}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon
                            color='#2eaaa4'
                            name='md-search'
                            size={25}
                        />
                    </View>
                    <View style={{flex: 8, borderBottomWidth: 1, borderBottomColor: "#2eaaa4"}}>
                        <TextInput placeholder='填写用户名/群名'
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) => {
                                       this.setState({name: text});
                                   }}
                        />
                    </View>
                </View>
                {this.renderSelectIteam(isShow)}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
        backgroundColor: "#ffffff",
        borderBottomColor: "#f1f1f1",
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    loginImage: {
        flexDirection: 'row',
        height: 100,
        marginTop: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    image: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        marginLeft: 10,
        backgroundColor: "#2eaaa4"
    },
    textView: {
        margin: 10,
        left: 10,
        marginLeft: 0,
    },
});
Find.propTypes = propTypes;

export default Find;