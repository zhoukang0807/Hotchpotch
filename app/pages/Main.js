import React from 'react';
import { StyleSheet, Image, Text, Linking, View } from 'react-native';
import { monitorMessage } from '../utils/RequestUtil';

class Main extends React.Component {
    constructor(props) {
        super(props);
        monitorMessage()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.disclaimer, { color: '#999999' }]}>
                    这是主要界面
                </Text>
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

export default Main;
