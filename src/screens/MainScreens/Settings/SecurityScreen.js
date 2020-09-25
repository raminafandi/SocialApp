import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class SecurityScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner_container}></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  inner_container: {
    width: '100%',
    height: '20%',
  },
});
