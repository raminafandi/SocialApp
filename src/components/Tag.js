import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { wsize, hsize } from '../entities/constants';
import FontText from './FontText';
import { MaterialIcons } from '@expo/vector-icons';

export default function Tag({
  title,
  deleteButton,
  deleteHandler,
  style,
  titleStyle,
  ...props
}) {
  return (
    <TouchableOpacity style={[styles.tag, style]} {...props}>
      <FontText style={[styles.tagText, titleStyle]}>{title}</FontText>
      {deleteButton ? (
        <TouchableOpacity
          onPress={deleteHandler}
          style={{ justifyContent: 'center', alignSelf: 'center' }}>
          <MaterialIcons name="cancel" size={15} color="black" />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#52BDEB',
    flexDirection: 'row',
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
