import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

import { window, wsize, hsize } from '../../entities/constants';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Tag from '../../components/Tag';
import PhotoGrid from './PhotoGrid';
const AddLookScreen = ({ route, navigation }) => {
  const [text, setText] = useState('');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <TextInput
          placeholder="Say something meaningful..."
          onChangeText={(text) => setText(text)}
          style={styles.input}
          maxLength={200}
        />
        <View style={styles.photoGrid}>
          <PhotoGrid />
        </View>
        <View style={styles.tags}>
          <Tag title="Sunglasses" />
          <Tag title="Gold" />
          <Tag title="ASOS" />
        </View>
        <View>
          <Button
            title="add item"
            style={styles.buttonStyle}
            titleStyle={styles.buttonTitleStyle}
          />
          <Button
            title="add cover"
            style={[styles.buttonStyle, { backgroundColor: '#0148FF' }]}
            titleStyle={[styles.buttonTitleStyle]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hsize(24),
  },
  input: {
    borderColor: 'black',
    backgroundColor: '#fafafa',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    width: wsize(338),
    height: hsize(56),
    justifyContent: 'center',
    marginBottom: hsize(14),
    paddingHorizontal: wsize(17),
  },
  photoGrid: {
    width: wsize(338),
    alignSelf: 'center',
  },
  buttonStyle: {
    width: wsize(332),
    height: hsize(50),
    backgroundColor: '#52BDEB',
  },
  buttonTitleStyle: {
    color: 'white',
    fontSize: wsize(22),
    fontWeight: '500',
  },
  tags: { flexDirection: 'row', marginLeft: wsize(24) },
});
export default AddLookScreen;
