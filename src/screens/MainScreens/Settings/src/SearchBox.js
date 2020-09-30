import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connectSearchBox } from 'react-instantsearch-native';
import { wsize, hsize } from '../../../../entities/constants';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    borderColor: '#ececec',
    backgroundColor: '#efefef',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    width: wsize(349),
    height: hsize(46),
    flexDirection: 'row',
    marginBottom: hsize(14),
    paddingStart: wsize(11),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  searchIcon: {
    alignSelf: 'center',
    marginRight: wsize(10),
  },
  input: {
    fontSize: wsize(15),
  },
});

const SearchBox = ({ currentRefinement, refine }) => {
  return (
    <View style={styles.container}>
      <AntDesign
        name="search1"
        size={wsize(13)}
        color="black"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => refine(value)}
        value={currentRefinement}
        placeholder="Search Item"
      />
    </View>
  );
};

SearchBox.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectSearchBox(SearchBox);
