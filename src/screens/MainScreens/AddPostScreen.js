import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import { window, wsize, hsize } from '../../entities/constants';
import Button from '../../components/Button';

const AddPostScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>add new</Text>
        <Button
          title="look"
          onPress={() => navigation.navigate('SearchLook')}
          style={{
            backgroundColor: '#6044F0',
            marginTop: wsize(5),
            width: wsize(335),
            height: hsize(83),
          }}
          titleStyle={{ color: 'white', fontSize: wsize(20) }}
        />
        <Button
          title="item"
          onPress={() => navigation.navigate('AddPhoto')}
          style={{
            backgroundColor: '#52BDEB',
            marginTop: wsize(5),
            width: wsize(335),
            height: hsize(83),
          }}
          titleStyle={{ color: 'white', fontSize: wsize(20) }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: wsize(36),
    fontWeight: '500', //should be fixed to the 500
    marginBottom: hsize(38),
  },
});
export default AddPostScreen;
