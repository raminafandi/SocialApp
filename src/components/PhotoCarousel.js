import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { window, wsize, hsize } from '../entities/constants';
import Carousel, { Pagination } from 'react-native-snap-carousel';

export default React.memo(function PhotoCarousel({ data }) {
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState();
  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        sliderWidth={window.width}
        itemWidth={window.width}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.img} />
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
});
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hsize(41),
  },
  img: {
    width: window.width,
    height: hsize(340),
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});
