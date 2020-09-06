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
  Button,
} from 'react-native';

import { window, wsize, hsize } from '../../../entities/constants';
import Tag from '../../../components/Tag';
import { FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Option from '../../../components/Option';

const NotificationsScreen = ({ navigation }) => {
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const renderingTags = tags.map((item, index) => {
    return <Tag title={item} key={index} />;
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Tags..."
            value={tag}
            onChangeText={(text) => {
              setTag(text);
            }}
            style={styles.textInput}
          />
          <TouchableOpacity
            style={styles.enterButton}
            onPress={() => {
              if (tag !== '') {
                setTags([...tags, tag]);
                setTag('');
              }
            }}>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>{renderingTags}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hsize(24),
  },
  inputContainer: {
    borderColor: '#ececec',
    backgroundColor: '#fafafa',
    alignSelf: 'center',
    borderWidth: 1,
    width: wsize(304),
    height: hsize(70),
    borderRadius: wsize(12),
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingStart: wsize(17),
    flexDirection: 'row',
  },
  textInput: {
    fontSize: wsize(18),
    width: wsize(240),
  },
  enterButton: {
    borderLeftWidth: 1,
    borderLeftColor: '#DADBDA',
    height: hsize(70),
    width: wsize(43),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default NotificationsScreen;
