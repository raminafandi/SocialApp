import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { wsize, hsize } from '../entities/constants';
import FontText from './FontText';
export default function Tag({ title, style, titleStyle, ...props }) {
  return (
    <TouchableOpacity style={[styles.tag, style]} {...props}>
      <FontText style={[styles.tagText, titleStyle]}>{title}</FontText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#52BDEB',
    borderRadius: 5,
    paddingHorizontal: wsize(5),
    marginLeft: wsize(4),
    marginBottom: hsize(9),
  },
  tagText: {
    color: '#FFFFFF',
    fontWeight: wsize(13),
    fontWeight: '500',
  },
});
