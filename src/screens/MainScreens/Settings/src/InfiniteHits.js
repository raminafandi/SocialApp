import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Highlight from './Highlight';
import PropTypes from 'prop-types';
import { connectInfiniteHits } from 'react-instantsearch-native';
import navigation from '../../../../services/navigation';
import { ItemContext } from '../../../../services/context/ItemContext';

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

const InfiniteHits = ({ hits, hasMore, refine, navigation }) => {
  const itemContext = useContext(ItemContext);
  return (
    <FlatList
      data={hits}
      keyExtractor={(item) => item.objectID}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={() => hasMore && refine()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            itemContext.selectItem(item);
            navigation.navigate('AddLook');
          }}>
          <Image
            source={{ uri: item.image }}
            style={{ height: 80, width: 80 }}
          />
          <View>
            <Highlight attribute="name" hit={item} />
            <Highlight attribute="info.description" hit={item} />
          </View>
        </TouchableOpacity>
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
