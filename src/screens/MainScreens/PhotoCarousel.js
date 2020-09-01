import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { wsize, hsize } from '../../entities/constants';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import data from '../../data/mock.json';

export default function PhotoCarousel({}) {
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState();
  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        sliderWidth={wsize(375)}
        itemWidth={wsize(375)}
        renderItem={({ item }) => (
          <Image source={{ uri: item.img }} style={styles.img} />
        )}
        onSnapToItem={(index) => {
          setSlider1ActiveSlide(index);
        }}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={slider1ActiveSlide}
        containerStyle={styles.paginationContainer}
        dotColor={'red'}
        dotStyle={styles.paginationDot}
        inactiveDotColor={'black'}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hsize(41),
  },
  img: {
    width: wsize(500),
    height: hsize(340),
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});
