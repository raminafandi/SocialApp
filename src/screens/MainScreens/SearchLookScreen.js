import React, { useState, useEffect } from 'react';
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
import * as albumsAPI from '../../services/api/album'
import LoadingScreen from '../OtherScreens/LoadingScreen'
import { window, wsize, hsize } from '../../entities/constants';
export default React.memo(({ navigation }) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false)
  const [albums, setAlbums] = useState(null);
  useEffect(() => {
    const data = [];
    setLoading(true)
    albumsAPI.getAlbums().then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, data: doc.data() });
      })
      setAlbums(data)
      setLoading(false)
    })
  }, [])
  if (loading)
    return <LoadingScreen />
  return (
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
        >
          <Text style={styles.tabTextFocused}>women</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={2}
        data={albums}
        onRefresh={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1000)
        }}
        keyExtractor={album => album.index}
        refreshing={loading}
        renderItem={({ item }) => {
          return (
            <LookCategory data={item.data} id={item.id} onPress={() => {
              navigation.navigate('Album', { id: item.id });
            }} />
          )
        }}
      />
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hsize(30),
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
