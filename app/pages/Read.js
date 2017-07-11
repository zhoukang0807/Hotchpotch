/**
 * Created by PC on 2017/6/28.
 */
import React, {PropTypes} from 'react';
import {
    StyleSheet,
    ScrollView,
    Image,
    ListView,
    Text,
    Linking,
    View,
    RefreshControl,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import GridView from '../components/GridView';
import { toastShort } from '../utils/ToastUtil';
import Button from '../components/Button';
import * as readActions from '../actions/read'
import store from 'react-native-simple-store';
const propTypes = {
    readActions: PropTypes.object,
    read: PropTypes.object.isRequired
};

class Read extends React.Component {
    constructor(props) {
        super(props);
        const {readActions} = this.props;
        readActions.requestArticleList();
        console.log(33);

    }
    //点击事件
    _onPressList(rowData){
        store.save('articleUrl', rowData.long);
        const {navigate} = this.props.navigation;
        navigate('Article');
   }
    renderListView() {

        const {read} = this.props;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(read.articleList),
        };
        console.log(read.articleList);

        if (read.articleList) {
            return (
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    contentContainerStyle={styles.no_data}
                    style={styles.base}
                    refreshControl={
                        <RefreshControl
                            refreshing={read.loading}
                            onRefresh={this.onRefresh}
                            title="Loading..."
                            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                        />
                    }
                >
                    <View style={styles.gridLayout}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={(rowData, sectionID, rowID) =>
                                <View >
                                    <TouchableOpacity
                                        onPress={()=>this._onPressList(rowData)}
                                        underlayColor="rgb(210, 230,255)"
                                        activeOpacity={0.5}
                                        style={{borderRadius: 8, padding: 0, marginTop: 0}}>
                                        <View>
                                            <View style={styles.row}>
                                                <Image style={styles.thumb} source={require('../img/about_logo.png')}/>
                                                <Text style={{
                                                    flex: 1,
                                                    fontSize: 16,
                                                    color: 'blue',
                                                    borderBottomColor: 'red'
                                                }}>{rowData.title}</Text>
                                            </View>
                                            <View style={styles.separator}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />

                    </View>
                </ScrollView>
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
                <View style={styles.header}>
                    <Text
                        style={[
                            styles.btnText,
                            {color: 'black', align: 'center', padding: 5, fontSize: 18}
                        ]}
                    >
                    </Text>
                </View>
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
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
        alignItems: 'center',    //#水平居中
        justifyContent: 'center',//  #垂直居中
        textAlign: 'center',  // #文字水平居中
    },
});
Read.propTypes = propTypes;
export default Read;