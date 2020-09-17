import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { window, wsize, hsize } from '../entities/constants';
import TextButton from './TextButton';
import { addComment } from '../services/api/comment';

export default React.memo(function CommentForm({ photoUrl, postId, onSubmit }) {
  const [comment, setComment] = useState('');
  const postHandler = () => {
    addComment({ postId, comment }).then((docRef) => {
      onSubmit && onSubmit(docRef.id, comment, postId);
    });
    setComment('');
  };

  return (
    <View style={styles.bottomContainer}>
      <Image
        source={{
          uri: photoUrl,
        }}
        style={styles.postHeaderIcon}
      />
      <TextInput
        placeholder="Add a comment..."
        value={comment}
        onChangeText={(text) => setComment(text)}
        style={styles.textInput}
        maxLength={256}
      />
      <TextButton
        onPress={() => {
          comment && postHandler();
        }}>
        Post
      </TextButton>
    </View>
  );
});

const styles = StyleSheet.create({
  bottomContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: hsize(50),
    width: '100%',
    paddingHorizontal: wsize(2),
    paddingVertical: hsize(10),
  },
  textInput: {
    width: wsize(250),
  },
  postHeaderIcon: {
    width: wsize(34),
    height: wsize(34),
    borderRadius: wsize(17),
  },
});
