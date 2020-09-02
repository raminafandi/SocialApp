import React, { useState } from 'react';
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

import data from '../../data/mock.json';
import Search from '../../components/Search';

import { window, wsize, hsize } from '../../entities/constants';
const SearchLookScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Search setSearch={setSearch} />
        <FlatList
          numColumns={3}
          data={data}
          style={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Image source={{ uri: item.img }} style={styles.img} />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
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
export default SearchLookScreen;
