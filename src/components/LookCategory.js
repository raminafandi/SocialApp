import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { hsize, wsize } from '../entities/constants';
import Tag from './Tag';

export default function LookCategory({ data, id, ...props }) {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.container}>
        <Image style={styles.img} source={{ uri: data.image }} />
        <Tag title={data.title} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginHorizontal: wsize(23),
    alignItems: 'center',
  },
  img: {
    width: wsize(144),
    height: wsize(144),
    marginBottom: 5,
  },
});
