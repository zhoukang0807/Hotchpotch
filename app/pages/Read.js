/**
 * Created by PC on 2017/6/28.
 */
import React, {PropTypes} from 'react';
import {
    StyleSheet,
    ScrollView,
    Image,
    ListView,
    FlatList,
    Text,
    Linking,
    View,
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    Animated
} from 'react-native';
import GridView from '../components/GridView';
import { toastShort } from '../utils/ToastUtil';
import Button from '../components/Button';
import * as readActions from '../actions/read'
import store from 'react-native-simple-store';
import { monitorMessage } from '../utils/RequestUtil';

const propTypes = {
    readActions: PropTypes.object,
    read: PropTypes.object.isRequired
};
var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

var pageNum = 1;
const contextTypes = {
    routes: PropTypes.object.isRequired
};
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class Read extends React.Component {
    constructor(props) {
        super(props);
        const {readActions} = this.props;
        readActions.requestArticleList(1);
        this.state={
            articleList:[]
        }
        this.next = true;
        this.nextPage=this.nextPage.bind(this)
        this.onRefresh=this.onRefresh.bind(this)
        this.renderFooter=this.renderFooter.bind(this)
        monitorMessage()
    }
    _keyExtractor = (item, index) => item.id;
    componentWillUnmount() {
        this.next=false
    }
    onRefresh(){
        console.log(this.props)
        const {readActions} = this.props;
        readActions.requestArticleList(1);
    }
    nextPage(){
        if(this.next){
            const {readActions} = this.props;
            readActions.requestArticleList(pageNum++);
        }
    }
    renderFooter() {
        const { read } = this.props;
        if (read.isLoadMore) {
            return (
                <View style={styles.footerContainer}>
                    <ActivityIndicator size="small" color="#3e9ce9" />
                    <Text style={styles.footerText}>数据加载中……</Text>
                </View>
            );
        }
        return <View />;
    }

    renderListView() {
        const {read} = this.props;
        if (read.articleList.length!=0) {
            var oldArticleList = this.state.articleList;
            var newArticleList  =read.articleList;
            if(oldArticleList.length!=0){
                newArticleList=oldArticleList.concat(newArticleList)
            }else{
                newArticleList=newArticleList.concat(oldArticleList)
            }

            newArticleList=newArticleList.unique();
            this.state={
                articleList:newArticleList
            }
            return (
            <AnimatedFlatList
                data={newArticleList}
                onEndReached={this.nextPage}
                onRefresh={this.onRefresh}
                refreshing={false}
                ListFooterComponent={this.renderFooter}
                keyExtractor={this._keyExtractor}
                renderItem={({item}) =>
                    <View onPressItem={this._onPressItem}>
                        <View>
                            <View style={styles.row}>
                                <TouchableOpacity onPress={()=>{
                                    const { routes } = this.context;
                                    store.save('articleUrl', item.link);
                                    routes.articleView();
                                } }
                                >
                                <Image style={styles.thumb}
                                    source={{uri:item.imageurls.length==0?"http://pic33.nipic.com/20130921/432252_200249985000_2.jpg":item.imageurls[0].url}}
                                />
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:4,flexDirection: 'column',marginLeft:10}} onPress={()=>{
                                    const { routes } = this.context;
                                    store.save('articleUrl', item.link);
                                    routes.articleView();
                                } } >
                                    <Text style={{
                                        flex: 1,
                                        fontSize: 16,
                                        color: 'blue',
                                        flexWrap: 'nowrap',
                                        borderBottomColor: 'red'
                                    }}  >{item.title}({item.source})</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.separator}/>
                        </View>
                    </View>
                }
            />

            );
        } else {
            return (
                <View >
                    <Text>没有获取到文章列表！</Text>
                </View>
            )
        }

    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderListView()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    disclaimer: {
        fontSize: 14,
        textAlign: 'center'
    },
    row: {
        padding:5,
        flex: 1,
        height:80,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    thumb: {
        flex:1,
        margin:5,
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
        alignItems: 'center',    //#水平居中
        justifyContent: 'center',//  #垂直居中
        textAlign: 'center',  // #文字水平居中
    },
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    footerText: {
        textAlign: 'center',
        fontSize: 16,
        marginLeft: 10
    },
});


Array.prototype.unique = function () {
    var res = [this[0]];
    for (var i = 1; i < this.length; i++) {
        var repeat = false;
        for (var j = 0; j < res.length; j++) {
            var a = this[i].id;
            var b = res[j].id
            if (a==b) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            res.push(this[i]);
        }
    }
    return res;
}


Read.propTypes = propTypes;
Read.contextTypes = contextTypes;
export default Read;