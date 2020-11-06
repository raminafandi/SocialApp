import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { wsize, hsize } from '../entities/constants';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import firebase from '../services/firebase/index'
import { likeComment, dislikeComment } from '../services/api/comment'
const iconSize = wsize(20);
const HeartButton = React.memo(({ commentId, likes, updateLikes, ...props }) => {
  const currentUser = firebase.auth().currentUser;
  const [liked, setLiked] = useState(false);
  const likeHandler = () => {
    setLiked(true)
    updateLikes(1);
    likeComment(commentId);
  };
  const dislikeHandler = () => {
    setLiked(false)
    updateLikes(-1);
    dislikeComment(commentId);
  };
  useEffect(() => {
    if (likes?.find((like) => like === currentUser.uid)) setLiked(true);
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        liked ? dislikeHandler() : likeHandler();
      }}
      {...props}
    >
      <AntDesign
        name={liked ? 'heart' : 'hearto'}
        size={iconSize}
        color={liked ? 'red' : 'black'}
        style={styles.postActionIcon}
      />
    </TouchableOpacity>
  );
});

export default function Comment({ style, id, author,comment, likes, navigation }) {
  const [numOfLikes, setNumOfLikes] = useState(likes.length);
  const profileHandler = () => {
    navigation.navigate('OtherProfile', {
      screen: "OtherProfile",
      params: {
        user: author

      }
    });
  }
  return (
    <View style={[styles.commentContainer, style]}>
      <TouchableOpacity onPress={profileHandler}>
        <Image
          source={{
            uri: author.photo,
          }}
          style={styles.postHeaderIcon}
        />
      </TouchableOpacity>
      <View>
        <View style={styles.commentInside}>
          <TouchableOpacity onPress={profileHandler}>
            <Text style={styles.profileName}>{author.userName}</Text>
          </TouchableOpacity>
          <Text style={styles.commentText}>{comment}</Text>
        </View>
        <View style={styles.commentInside}>
          {/* <Text style={styles.bottomCommentSectionText}>1h</Text> */}
          <Text style={styles.bottomCommentSectionText}>{numOfLikes} likes</Text>
          {/* <Text style={styles.bottomCommentSectionText}>Reply</Text> */}
        </View>
      </View>

      <HeartButton style={{
        justifyContent: 'center',
      }} commentId={id} likes={likes} updateLikes={(val) => setNumOfLikes(numOfLikes + val)} />
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wsize(327),
    paddingHorizontal: wsize(10),
    paddingVertical: hsize(10),
  },
  commentInside: {
    flexDirection: 'row',
  },
  postHeaderIcon: {
    width: wsize(50),
    height: wsize(50),
    borderRadius: wsize(25),
    marginRight: wsize(8),
    alignSelf: 'center',
  },
  profileName: {
    color: '#0148FF',
    fontWeight: 'bold',
  },
  likeIcon: {
    alignSelf: 'center',
  },
  commentText: {
    marginLeft: wsize(4),
    marginRight: wsize(4),
    flexShrink: 1,
    width: wsize(220),
  },
  bottomCommentSectionText: {
    marginRight: wsize(10),
  },
});
