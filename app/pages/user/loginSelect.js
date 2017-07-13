import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
const RIGHT_OPTIONS = [
    {"name": "邮箱注册", "tag": "Register",icon:"md-mail"},
    {"name": "忘记密码", "tag": "Forget",icon:"md-help"},
];
export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        };
    }
    _optionSelect(data){
        const {navigate} = this.props.navigation;;
        navigate(RIGHT_OPTIONS[data].tag);
    }
    _dropdown_renderRow(rowData, rowID, highlighted) {
        return (
            <TouchableHighlight underlayColor='cornflowerblue'>
                <View style={styles.dropdown_row}>
                    <Icon
                        color='#FFF'
                        name={rowData.icon}
                        size={25}
                    />
                    <Text style={styles.dropdown_row_text}>
                        {rowData.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ModalDropdown style={styles.dropdown}
                           textStyle={styles.dropdown_text}
                           dropdownStyle={styles.dropdown_dropdown}
                           options={RIGHT_OPTIONS}
                           onSelect={this._optionSelect.bind(this)}
                           renderRow={this._dropdown_renderRow.bind(this)}
            >
                <View style={{paddingRight: 10}}>
                    <Icon
                        color='#FFF'
                        name='md-more'
                        size={25}
                    />
                </View>
            </ModalDropdown>
        );
    }

}
const styles = StyleSheet.create({
    dropdown: {
        alignSelf: 'flex-end',
        borderWidth: 0,
        paddingRight:10,
        borderRadius: 3,
    },
    dropdown_text: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdown_dropdown: {
        width: 150,
        height:83,
        backgroundColor:"#4c4c4c",
        borderColor: '#4c4c4c',
        borderWidth: 1,
        borderRadius: 3,
    },
    dropdown_row: {
        flexDirection: 'row',
        height: 40,
        paddingLeft:20,
        backgroundColor:"#4c4c4c",
        alignItems: 'center',
    },
    dropdown_row_text: {
        fontSize: 16,
        paddingLeft:20,
        color: '#FFF',
        textAlignVertical: 'center',
    }
});


