import React, { useState, useEffect } from 'react';
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
  KeyboardAvoidingView,
} from 'react-native';

import { window, wsize, hsize } from '../../entities/constants';
import { FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Comment from '../../components/Comment';
import TextButton from '../../components/TextButton';
import CommentForm from '../../components/CommentForm';
import LoadingScreen from '../OtherScreens/LoadingScreen';
import { getComments } from '../../services/api/comment';
import { addItem } from '../../services/api/item';

const CommentsScreen = ({ navigation, route }) => {
  const { user, postId } = route.params;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getComments(postId)
      .then((querySnapshot) => {
        const allData = [];
        querySnapshot.forEach((doc) => {
          allData.push({ id: doc.id, ...doc.data() });
        });
        return allData;
      })
      .then((allData) => {
        setComments(allData);
        setLoading(false);
      });
  }, []);
  const addCommentToUI = (id, comment, postId) =>
    setComments([
      ...comments,
      {
        id: id,
        author: {
          id: user.id,
          photo: user.photoURL,
          userName: user.displayName,
        },
        body: comment,
        postId: postId,
        likes: [],
      },
    ]);
  if (loading) return <LoadingScreen fullscreen />;
  console.log('Men navigationam');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          {comments?.map(({ id, author, body, likes }, index) => (
            <Comment
              id={id}
              key={index}
              author={author}
              comment={body}
              likes={likes}
              navigation={navigation}
            />
          ))}
        </View>
        <View style={{ width: '95%', alignSelf: 'center' }}>
          <CommentForm
            photoUrl={user.photoURL}
            postId={postId}
            onSubmit={addCommentToUI}
          />
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
});
export default CommentsScreen;
