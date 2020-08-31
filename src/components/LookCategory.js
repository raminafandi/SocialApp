import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { hsize, wsize } from '../entities/constants';
import Tag from './Tag';

export default function LookCategory({ data }) {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: data.img }} />
      <Tag title={data.title} />
    </View>
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
