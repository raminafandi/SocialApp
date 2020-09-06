import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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

import Search from '../../components/Search';
import * as albumsAPI from '../../services/api/album'
import { window, wsize, hsize } from '../../entities/constants';
import LoadingScreen from '../OtherScreens/LoadingScreen';
export default React.memo(({ navigation, route }) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState([]);
  const firstUpdate = useRef(true);
  const { id, clearSelectedItems } = route.params
  useEffect(() => {
    setLoading(true)
    albumsAPI.getItemsOfAlbum(id).then(doc => {
      setItems(doc.data().items)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const { clearSelectedItems } = route.params
    if (clearSelectedItems) {
      setSelectedItems([])
      firstUpdate.current = true
    }
  }, [route.params])
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    navigation.navigate('AddLook', { selectedItems: selectedItems });
  }, [selectedItems]);

  return (
    <View style={styles.container}>
      <Search setSearch={setSearch} />
      {loading ? <LoadingScreen /> :
        <FlatList
          numColumns={3}
          data={items}
          style={styles.list}
          renderItem={({ item }) => {
            return (
              // <TouchableOpacity onPress={() => navigation.navigate('Item', { fetchId: item.id })}>
              //   <Image source={{ uri: item.image }} style={styles.img} />
              // </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setSelectedItems([item, ...selectedItems]);
              }
              }>
                <Image source={{ uri: item.image }} style={styles.img} />
              </TouchableOpacity>
            )
          }}
        />
      }
    </View>
  );
})

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
