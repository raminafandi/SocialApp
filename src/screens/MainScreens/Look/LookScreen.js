import { useRoute } from '@react-navigation/native';
import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useContext,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';

import { window, wsize, hsize } from '../../../entities/constants';

export default React.memo(({ navigation }) => {
  const route = useRoute()
  const { items } = route.params


  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        data={items}
        style={styles.list}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Item', { fetchId: item.id })}>
              <Image source={{ uri: item.image }} style={styles.img} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hsize(30),
    backgroundColor: 'white',
  },
  list: {
    marginTop: hsize(31),
    marginHorizontal: wsize(5),
  },
  img: {
    width: wsize(125),
    height: wsize(125),
    borderWidth: 1,
    borderColor: 'white',
  },
});
