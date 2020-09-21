import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import Highlight from './Highlight';
import PropTypes from 'prop-types';
import { connectInfiniteHits } from 'react-instantsearch-native';

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    padding: 10,
    flexDirection: 'row',
  },
  titleText: {
    fontWeight: 'bold',
  },
});

const InfiniteHits = ({ hits, hasMore, refine }) => {
  // console.log('infinite hits: ', hits,)
  // console.log('infinite hasMore: ', hasMore)
  return (
    <FlatList
      data={hits}
      keyExtractor={(item) => item.objectID}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={() => hasMore && refine()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image
            source={{ uri: item.image }}
            style={{ height: 80, width: 80 }}
          />
          <View>
            <Highlight attribute="name" hit={item} />
            <Highlight attribute="info.description" hit={item} />
          </View>
        </View>
      )}
    />
  );
};
InfiniteHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectInfiniteHits(InfiniteHits);
