import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { wsize, hsize } from '../entities/constants';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';

export default function Comment({ style, profileName, comment }) {
  return (
    <View style={[styles.commentContainer, style]}>
      <Image
        source={{
          uri: 'https://i.imgur.com/YHk0msx.jpg',
        }}
        style={styles.postHeaderIcon}
      />
      <View>
        <View style={styles.commentInside}>
          <Text style={styles.profileName}>{profileName}</Text>
          <Text style={styles.commentText}>{comment}</Text>
        </View>
        <View style={styles.commentInside}>
          <Text style={styles.bottomCommentSectionText}>1h</Text>
          <Text style={styles.bottomCommentSectionText}>5 likes</Text>
          <Text style={styles.bottomCommentSectionText}>Reply</Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          justifyContent: 'center',
        }}>
        <AntDesign
          name="hearto"
          size={20}
          color="black"
          style={styles.likeIcon}
        />
      </TouchableOpacity>
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
