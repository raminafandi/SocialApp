import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  //   Button,
} from 'react-native';
import { wsize, hsize } from '../entities/constants';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import firebase from '../services/firebase/index';
import { likeComment, dislikeComment } from '../services/api/comment';
import {
  getUserInfo,
  confirmSubRequestForPrivateUser,
  deleteSubRequestForPrivateUser,
} from '../services/api/user';
import LoadingScreen from '../screens/OtherScreens/LoadingScreen';

import Button from './Button';
export default function Comment({
  style,
  // author,
  userId,
  //   comment,
  navigation,
}) {
  const profileHandler = () => {
    navigation.navigate('OtherProfile', { user: userId });
  };
  const [loading, setLoading] = useState(true);
  const [reqUser, setUser] = useState();
  useEffect(() => {
    getUserInfo(userId).then((user) => {
      setLoading(false);
      setUser(user.data());
    });
  }, []);
  if (loading || !reqUser) return <LoadingScreen fullscreen />;

  return (
    <View style={[styles.commentContainer, style]}>
      <TouchableOpacity onPress={profileHandler}>
        <Image
          source={{
            uri: reqUser.photoURL,
          }}
          style={styles.postHeaderIcon}
        />
      </TouchableOpacity>
      <View style={{ width: wsize(150) }}>
        <TouchableOpacity onPress={profileHandler}>
          <Text style={styles.profileName}>{reqUser.userName}</Text>
        </TouchableOpacity>
        <Text style={styles.commentText}>{reqUser.fullName}</Text>
      </View>
      <Button
        title="Confirm"
        style={{
          width: wsize(65),
          height: hsize(40),
          backgroundColor: '#52BDEB',
        }}
        onPress={() => {
          confirmSubRequestForPrivateUser(userId);
        }}
      />
      <Button
        title="Delete"
        style={{
          width: wsize(70),
          height: hsize(40),
          //   backgroundColor: 'red',
        }}
        onPress={() => {
          deleteSubRequestForPrivateUser(userId);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    width: wsize(327),
    paddingHorizontal: wsize(10),
    paddingVertical: hsize(10),
  },
  commentInside: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
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
