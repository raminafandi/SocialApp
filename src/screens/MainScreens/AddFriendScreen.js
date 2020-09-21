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

import { window, wsize, hsize } from '../../entities/constants';
import { ItemContext } from '../../services/context/ItemContext';

import { InstantSearch } from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch/lite';

import SearchBox from './Settings/src/SearchBox';
import InfiniteHits from './Settings/src/InfiniteHits';
const searchClient = algoliasearch(
  'RWCGA0GQ1P',
  '7ff2845ec876110cfa72bf3ea3e0abbd'
);

export default React.memo(({ navigation }) => {
  const [search, setSearch] = useState({ page: '', query: '' });

  return (
    <View style={styles.container}>
      <InstantSearch
        searchClient={searchClient}
        indexName="users"
        searchState={search}
        onSearchStateChange={(text) => setSearch(text)}>
        <SearchBox />
        <InfiniteHits />
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
});
