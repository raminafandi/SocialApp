import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import PhotoGrid from './PhotoGrid';
import { window, wsize, hsize } from '../entities/constants';

export default React.memo(function ({
  coverImage,
  items,
  navigation,
  clickEventListener,
}) {
  const [bullet, setBullet] = useState(true);
  return (
    <View>
      <ScrollView
        horizontal={true}
        onScrollEndDrag={() => {
          if (bullet === true) {
            setBullet(false);
          } else {
            setBullet(true);
          }
        }}
        decelerationRate={'fast'}
        scrollEventThrottle={200}
        contentContainerStyle={{ width: window.width * 2 }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}>
        <View style={styles.view}>
          <Image
            source={{ uri: coverImage }}
            style={{ width: window.width - 35, height: 300 }}
          />
        </View>
        <View style={{ flex: 1, width: window.width }}>
          <TouchableOpacity style={{ flex: 1, width: window.width }} onPress={clickEventListener}>
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
          </TouchableOpacity>
        </View>
      </ScrollView>
      {bullet ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.bigBullet} />
          <View style={styles.littleBullet} />
        </View>
      ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.littleBullet} />
            <View style={styles.bigBullet} />
          </View>
        )}
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
  bigBullet: {
    height: 16,
    width: 16,
    backgroundColor: '#adb5bd',
    margin: 8,
    borderRadius: 8,
  },
  littleBullet: {
    height: 10,
    width: 10,
    backgroundColor: '#ced4da',
    margin: 8,
    borderRadius: 5,
  },
});
