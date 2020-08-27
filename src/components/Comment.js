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
  profileName: {
    color: '#0148FF',
    fontWeight: 'bold',
  },

  commentContainer: {
    flexDirection: 'row',
  },
  commentText: {},
});
