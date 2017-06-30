/**
 * Created by PC on 2017/6/28.
 */
import React, { PropTypes } from 'react';
import { StyleSheet,ScrollView, Image,ListView ,Text, Linking, View ,RefreshControl,} from 'react-native';
import GridView from '../components/GridView';

import Button from '../components/Button';
import * as readActions from '../actions/read'
const propTypes = {
    readActions: PropTypes.object,
    read: PropTypes.object.isRequired
};

const contextTypes = {
    routes: PropTypes.object.isRequired
};
class Read extends React.Component {
    constructor(props) {
        super(props);
        const { readActions } = this.props;
        readActions.requestArticleList();
        console.log(33);
        const  { read } = this.props;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(read.articleList),
        };
    }
    renderListView() {
        const { read } = this.props;
        console.log(read.articleList);
        if(read.articleList){
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
                            renderRow={(rowData) => <Text>{rowData.title}</Text>}
                        />

                    </View>
                </ScrollView>
            );
        }else{
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
                            { color: 'black', padding: 5, fontSize: 18 }
                        ]}
                    >
                        read界面
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
});

export default Read;