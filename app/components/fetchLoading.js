/**
 *
 * Copyright 2015-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
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
        const { showLoading } = this.props
        return (
        <Modal
            animationType="fade"
            visible={showLoading}
            transparent
            onRequestClose={() => this._close()}
        >
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#3e9ce9"/>
            </View>
        </Modal>)
    }
};

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    loadingText: {
        marginTop: 10,
        textAlign: 'center'
    }
});

export default FetchLoading;
