import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { wsize } from '../entities/constants';

export default function Tag({ title, style, titleStyle, ...props }) {
  return (
    <TouchableOpacity style={[styles.tag, style]} {...props}>
      <Text style={[styles.tagText, titleStyle]}>{title}</Text>
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
