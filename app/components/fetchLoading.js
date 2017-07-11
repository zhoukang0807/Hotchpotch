import React from 'react';
import {ActivityIndicator,Modal,Text, StyleSheet, View} from 'react-native';

class  FetchLoading extends React.Component {
    constructor(props) {
        super(props);
    }
    _close() {
        console.log("onRequestClose ---- ")
    }
    render() {
        const { showLoading,tips} = this.props
        return (
        <Modal
            animationType="fade"
            visible={showLoading}
            transparent
            onRequestClose={() => this._close()}
        >
            <View style={styles.loading}>
                <View style={styles.rowView}>
                <Text style={styles.loadingText}>{tips}</Text>
                <ActivityIndicator size="small" color="#FFF"/>
                </View>
            </View>
        </Modal>)
    }
};

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    loadingText: {
        textAlign: 'center',
        color:"#ffffff",
        fontSize:12
    },
    rowView: {
        flexDirection: 'row',
        backgroundColor:"#595959",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    }
});

export default FetchLoading;
