import React from 'react';
import { StyleSheet, Image, Text, Linking, View } from 'react-native';
class About extends React.Component {
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
