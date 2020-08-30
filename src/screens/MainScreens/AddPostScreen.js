import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

import { window, wsize, hsize } from '../../entities/constants';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import TextButton from '../../components/TextButton';
import Button from '../../components/Button';
import Tag from '../../components/Tag';

const AddPostScreen = ({}) => {
  const iconSize = wsize(26);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>add new</Text>
        </View>
        <Button
          title="look"
          style={{
            backgroundColor: '#52BDEB',
            marginTop: wsize(5),
            width: wsize(335),
            height: hsize(83),
          }}
          titleStyle={{ color: 'white', fontSize: wsize(20) }}
        />
        <Button
          title="item"
          style={{
            backgroundColor: '#0148FF',
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
    fontWeight: 'bold', //should be fixed to the 500
    marginBottom: hsize(38),
  },
});
export default AddPostScreen;
