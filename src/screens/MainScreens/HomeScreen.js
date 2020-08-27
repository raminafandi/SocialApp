import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { window, wsize, hsize } from '../../entities/constants';
import { Entypo } from '@expo/vector-icons';
const HomeScreen = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.post}>
        <View style={styles.postHeaderContainer}>
          <TouchableOpacity style={styles.postHeaderFirst}>
            <Image
              source={{
                uri:
                  'https://m.media-amazon.com/images/M/MV5BMTM3OTUwMDYwNl5BMl5BanBnXkFtZTcwNTUyNzc3Nw@@._V1_.jpg',
              }}
              style={styles.postHeaderIcon}
            />
            <Text>sjohansson</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postHeaderSecond}>
            <Entypo name="dots-three-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.postImageContainer}>
          <Image
            source={{
              uri:
                'https://cdn.kimkim.com/files/a/content_articles/featured_photos/40a4a0466cf71488066604a768343bbd2e3ec887/big-cc0db690aecc5bfb792026baff489302.jpg',
            }}
            style={styles.postImage}
          />
        </View>
        <View style={styles.postActionsContainer}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  postHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  postHeaderFirst: {
    flexDirection: 'row',
  },
  postHeaderSecond: {
    marginRight: wsize(14),
  },
  postHeaderIcon: {
    width: wsize(34),
    height: hsize(34),
  },
  postImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    width: wsize(340),
    height: hsize(340),
  },
});

export default HomeScreen;
