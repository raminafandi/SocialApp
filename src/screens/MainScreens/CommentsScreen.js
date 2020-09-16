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
  const { photoUrl, postId } = route.params;
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

  if (loading) return <LoadingScreen fullscreen />;
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
          <CommentForm photoUrl={photoUrl} postId={postId} />
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
