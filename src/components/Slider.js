import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import PhotoGrid from './PhotoGrid';
import { window, wsize, hsize } from '../entities/constants';

export default React.memo(function ({
  coverImage,
  items,
  navigation,
  clickEventListener,
}) {
  return (
    <View>
      <ScrollView
        horizontal={true}
        decelerationRate={'fast'}
        scrollEventThrottle={200}
        contentContainerStyle={{ width: window.width * 2 }}
        pagingEnabled={true}>
        <View style={styles.view}>
          <Image
            source={{ uri: coverImage }}
            style={{ width: window.width - 35, height: 300 }}
          />
        </View>
        <View style={{ flex: 1, width: window.width }}>
          <PhotoGrid
            items={items}
            clickEventListener={clickEventListener}
            navigation={navigation}
            gridStyle={{
              flex: 1,
              justifyContent: 'center',
              width: window.width,
              marginLeft: -35,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    width: window.width,
    height: 300,
    margin: 0,
    padding: 0,
  },
});
