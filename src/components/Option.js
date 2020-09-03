import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { window, wsize, hsize } from '../entities/constants';

export default function ({
  title,
  navigation,
  navigateTo,
  children,
  ...props
}) {
  return (
    <TouchableOpacity
      style={styles.modalOption}
      onPress={() => {
        navigation.navigate(navigateTo);
      }}>
      {children}
      <Text style={styles.modalOptionText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  modalOption: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DADBDA',
    padding: wsize(4),
    paddingLeft: wsize(19),
  },
  modalOptionText: {
    fontSize: wsize(18),
  },
});
