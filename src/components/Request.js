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

import Button from './Button';
export default function Comment({
  style,
  //   author,
  //   comment,
  navigation,
}) {
  //   const profileHandler = () => {
  //     navigation.navigate('OtherProfile', { user: author });
  //   };
  return (
    <View style={[styles.commentContainer, style]}>
      {/* <TouchableOpacity onPress={profileHandler}> */}
      <TouchableOpacity>
        <Image
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/c/c2/Rihanna_Fenty_2018.png',
          }}
          style={styles.postHeaderIcon}
        />
      </TouchableOpacity>
      <View style={{ width: wsize(150) }}>
        {/* <TouchableOpacity onPress={profileHandler}>*/}
        <TouchableOpacity>
          <Text style={styles.profileName}>riribadgal</Text>
        </TouchableOpacity>
        <Text style={styles.commentText}>Rihanna</Text>
      </View>
      <Button
        title="Confirm"
        style={{
          width: wsize(65),
          height: hsize(40),
          backgroundColor: '#52BDEB',
        }}
      />
      <Button
        title="Delete"
        style={{
          width: wsize(70),
          height: hsize(40),
          //   backgroundColor: 'red',
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
