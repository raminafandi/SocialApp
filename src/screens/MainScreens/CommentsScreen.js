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
import { FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Comment from '../../components/Comment';
import TextButton from '../../components/TextButton';
const CommentsScreen = ({ navigation }) => {
  const [comment, setComment] = useState('');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Comment
            profileName="neymar"
            comment="oy bla cirildim alaaa asdgsahdkdahsddsldhaikqwjfnh;oihfqio;fljsabnbflkjnb"
          />
          <Comment
            profileName="neymar"
            comment="oy bla cirildim alaaa asdgsahdkdahsddsldhaikqwjfnh;oihfqio;fljsabnbflkjnbasdasdasdasdasd"
          />
        </View>
        <View style={styles.bottomContainer}>
          <Image
            source={{
              uri: 'https://i.imgur.com/YHk0msx.jpg',
            }}
            style={styles.postHeaderIcon}
          />
          <TextInput
            placeholder="Add a comment..."
            onChangeText={(text) => setComment(text)}
            style={styles.textInput}
          />
          <TextButton>Post</TextButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hsize(24),
    justifyContent: 'space-between',
  },
  postHeaderIcon: {
    width: wsize(40),
    height: wsize(40),
    borderRadius: wsize(20),
    marginRight: wsize(8),
    alignSelf: 'center',
  },
  bottomContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    height: hsize(50),
    width: '100%',
    borderColor: '#DADBDA',
    paddingHorizontal: wsize(10),
    paddingVertical: hsize(10),
  },
  textInput: {
    width: wsize(250),
  },
});
export default CommentsScreen;
