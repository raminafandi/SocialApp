import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { wsize } from '../entities/constants';

export default function Comment({ style, profileName, comment }) {
  return (
    <View style={[styles.commentContainer, style]}>
      <Text style={styles.profileName}>{profileName}</Text>
      <Text style={styles.commentText}>{comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    width: wsize(327),
  },
  profileName: {
    color: '#0148FF',
    fontWeight: 'bold',
  },
  
  commentText: {
    marginLeft: wsize(4),
    flexShrink: 1
  },
});
