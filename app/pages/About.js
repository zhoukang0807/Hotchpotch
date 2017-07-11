import React from 'react';
import { StyleSheet, Image, Text, Linking, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
class About extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '我',
        tabBarLabel: '我',
        tabBarIcon: ({tintColor}) => (
            <Icon name="md-person" size={25} color={tintColor} />
        ),
    });
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.disclaimer, { color: '#999999' }]}>
          免责声明：所有内容均来自:
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

export default About;
