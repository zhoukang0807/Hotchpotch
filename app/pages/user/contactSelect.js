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
    {"name": "搜索", "tag": "Find",icon:"md-person-add"},
    {"name": "新建群组", "tag": "RoomCreate",icon:"md-people"},
    {"name": "扫一扫", "tag": "sweep",icon:"md-qr-scanner"},
];
export default class ContactSelect extends Component {
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
    _dropdown_2_renderRow(rowData, rowID, highlighted) {
        return (
            <TouchableHighlight underlayColor='cornflowerblue'>
                <View style={styles.dropdown_2_row}>
                    <Icon
                        color='#FFF'
                        name={rowData.icon}
                        size={25}
                    />
                    <Text style={styles.dropdown_2_row_text}>
                        {rowData.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ModalDropdown style={styles.dropdown_2}
                           textStyle={styles.dropdown_2_text}
                           dropdownStyle={styles.dropdown_2_dropdown}
                           options={RIGHT_OPTIONS}
                           onSelect={this._optionSelect.bind(this)}
                           renderRow={this._dropdown_2_renderRow.bind(this)}
            >
                <View style={{paddingRight: 10}}>
                    <Icon
                        color='#FFF'
                        name='md-add'
                        size={25}
                    />
                </View>
            </ModalDropdown>
        );
    }

}
const styles = StyleSheet.create({
    dropdown_2: {
        alignSelf: 'flex-end',
        borderWidth: 0,
        paddingRight:10,
        borderRadius: 3,
    },
    dropdown_2_text: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdown_2_dropdown: {
        width: 150,
        height:123,
        backgroundColor:"#4c4c4c",
        borderColor: '#4c4c4c',
        borderWidth: 1,
        borderRadius: 3,
    },
    dropdown_2_row: {
        flexDirection: 'row',
        height: 40,
        paddingLeft:20,
        backgroundColor:"#4c4c4c",
        alignItems: 'center',
    },
    dropdown_2_row_text: {
        fontSize: 16,
        paddingLeft:20,
        color: '#FFF',
        textAlignVertical: 'center',
    }
});


