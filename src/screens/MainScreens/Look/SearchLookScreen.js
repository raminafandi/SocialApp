import React, { useState, useEffect, useContext } from 'react';
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

import LookCategory from '../../../components/LookCategory';
import Search from '../../../components/Search';
import * as albumsAPI from '../../../services/api/album';
import LoadingScreen from '../../OtherScreens/LoadingScreen';
import BackButton from './BackButton';
import { window, wsize, hsize } from '../../../entities/constants';
import { ItemContext } from '../../../services/context/ItemContext';

import {
  InstantSearch,
  connectRefinementList,
} from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch/lite';

import SearchBox from '../Settings/src/SearchBox';
import InfiniteHits from '../Settings/src/InfiniteHits';
const searchClient = algoliasearch(
  'RWCGA0GQ1P',
  '7ff2845ec876110cfa72bf3ea3e0abbd'
);

export default React.memo(({ navigation }) => {
  const [search, setSearch] = useState({ page: '', query: '' });
  const [loading, setLoading] = useState(true);
  const [miniLoading, setMiniLoading] = useState(false);
  const [albums, setAlbums] = useState(null);
  const itemContext = useContext(ItemContext);
  const fetchData = () =>
    albumsAPI.getAlbums().then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, data: doc.data() });
      });
      return data;
    });
  navigation.setOptions({
    headerLeft: (props) => (
      <BackButton
        {...props}
        onPress={itemContext.clearSelectedItems}
        navigation={navigation}
      />
    ),
  });
  useEffect(() => {
    // setLoading(true)
    fetchData().then((data) => {
      setAlbums(data);
      setLoading(false);
    });
  }, []);

  // const case1 = (

  // );

  return (
    <View style={styles.container}>
      <InstantSearch
        searchClient={searchClient}
        indexName="items"
        searchState={search}
        onSearchStateChange={(text) => setSearch(text)}>
        <SearchBox />
        {console.log(search)}
        {search.query.length > 0 ? (
          <InfiniteHits navigation={navigation} />
        ) : (
          <View>
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
              <TouchableOpacity style={styles.tabFocused}>
                <Text style={styles.tabTextFocused}>women</Text>
              </TouchableOpacity>
            </View>
            {loading ? (
              <LoadingScreen />
            ) : (
              <FlatList
                numColumns={2}
                data={albums}
                onRefresh={() => {
                  setMiniLoading(true);
                  fetchData().then((data) => {
                    setAlbums(data);
                    setMiniLoading(false);
                  });
                }}
                keyExtractor={(album) => album.index}
                refreshing={miniLoading}
                renderItem={({ item }) => {
                  return (
                    <LookCategory
                      data={item.data}
                      id={item.id}
                      onPress={() => {
                        navigation.navigate('Album', { id: item.id });
                      }}
                    />
                  );
                }}
              />
            )}
          </View>
        )}
      </InstantSearch>
    </View>
  );
});

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
