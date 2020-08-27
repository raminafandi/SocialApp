import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { wsize } from '../entities/constants';

export default function Tag({ title }) {
  return (
    <TouchableOpacity style={styles.tag}>
      <Text style={styles.tagText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#52BDEB',
    borderRadius: 5,
    paddingHorizontal: wsize(5),
    marginLeft: wsize(4),
  },
  tagText: {
    color: '#FFFFFF',
  },
});
