import React from 'react';
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
import { wsize, hsize } from '../../../../entities/constants';

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  postHeaderContainer: {
    flexDirection: 'row',
    paddingHorizontal: wsize(20),
    paddingVertical: hsize(10),
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: hsize(11),
  },
  postHeaderFirst: {
    flexDirection: 'row',
  },
  postHeaderSecond: {
    marginRight: wsize(2),
  },
  postHeaderProfileName: {
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: wsize(14),
    marginLeft: wsize(9),
    color: '#262626',
  },
});

const InfiniteHits = ({ hits, hasMore, refine, navigation }) => {
  return (
    <FlatList
      data={hits}
      keyExtractor={(item) => item.objectID}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={() => hasMore && refine()}
      renderItem={({ item }) => (
        <View style={styles.postHeaderContainer}>
          <TouchableOpacity
            style={styles.postHeaderFirst}
            onPress={() => {
              navigation.navigate('OtherProfile', {
                user: {
                  id: item.objectID,
                  photo: item.photoURL,
                  userName: item.userName,
                },
              });
            }}>
            <Image
              source={{ uri: item.photoURL }}
              style={{ height: 50, width: 50, borderRadius: 25 }}
            />
            <Text style={styles.postHeaderProfileName}>{item.userName}</Text>
          </TouchableOpacity>
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
