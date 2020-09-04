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
import LookCategory from '../../components/LookCategory';
import Search from '../../components/Search';

import { window, wsize, hsize } from '../../entities/constants';
const SearchLookScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Search setSearch={setSearch} />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tabNormal}
            onPress={() => {
              navigation.navigate('PhotoGrid');
            }}>
            <Text style={styles.tabText}>unisex</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabNormal}
            onPress={() => {
              navigation.navigate('AddLook');
            }}>
            <Text style={styles.tabText}>men</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabFocused}
            onPress={() => {
              navigation.navigate('Album');
            }}>
            <Text style={styles.tabTextFocused}>women</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={2}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <LookCategory data={item} />
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

  tabContainer: {
    width: wsize(349),
    height: hsize(46),
    flexDirection: 'row',
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: wsize(8),
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: hsize(21),
    backgroundColor: '#EFEFEF',
  },
  tabNormal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#979797',
    width: wsize(116),
    borderRightWidth: 1,
  },
  tabFocused: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#979797',
    width: wsize(116),
    borderRightWidth: 1,
    backgroundColor: '#0148FF',
  },
  tabText: {
    color: '#979797',
    fontSize: wsize(15),
  },
  tabTextFocused: {
    color: 'white',
    fontSize: wsize(15),
  },
});
export default SearchLookScreen;
