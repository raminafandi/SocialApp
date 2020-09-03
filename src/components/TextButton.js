import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { wsize } from '../entities/constants';

export default function TextButton({ textStyle, children, ...props }) {
  return (
    <TouchableOpacity {...props}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#52BDEB',
    fontWeight: 'bold',
    marginLeft: wsize(3),
  },
});
