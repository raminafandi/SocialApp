import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { InstantSearch } from 'react-instantsearch-native';
import RefinementList from './RefinementList';

import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'JFX0SC061C',
  'd8f2fb0b57c723d265ab606f167f360d'
);
const styles = StyleSheet.create({
  closeButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 18,
  },
});

const Filters = ({
  isModalOpen,
  searchState,
  toggleModal,
  onSearchStateChange,
}) => {
  console.log('Modal Filters searchState: ', searchState);
  return (
    <Modal animationType="slide" visible={isModalOpen}>
      <SafeAreaView>
        <InstantSearch
          searchClient={searchClient}
          indexName="items"
          searchState={searchState}
          onSearchStateChange={onSearchStateChange}>
          <RefinementList attribute="brand" />
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </InstantSearch>
      </SafeAreaView>
    </Modal>
  );
};

Filters.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  searchState: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onSearchStateChange: PropTypes.func.isRequired,
};

export default Filters;
