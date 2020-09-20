import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';
import {
  InstantSearch,
  connectRefinementList,
} from 'react-instantsearch-native';
import Filters from './src/Filters';
import SearchBox from './src/SearchBox';
import InfiniteHits from './src/InfiniteHits';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'RWCGA0GQ1P',
  '7ff2845ec876110cfa72bf3ea3e0abbd'
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#252b33',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

const VirtualRefinementList = connectRefinementList(() => null);

class App extends React.Component {
  root = {
    Root: View,
    props: {
      style: {
        flex: 1,
      },
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      searchState: {},
    };
  }

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  onSearchStateChange = (searchState) => {
    this.setState(() => ({
      searchState,
    }));
  };

  render() {
    const { isModalOpen, searchState } = this.state;
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <InstantSearch
            searchClient={searchClient}
            indexName="items"
            root={this.root}
            searchState={searchState}
            onSearchStateChange={this.onSearchStateChange}>
            <VirtualRefinementList attribute="brand" />
            <Filters
              isModalOpen={isModalOpen}
              searchState={searchState}
              toggleModal={this.toggleModal}
              onSearchStateChange={this.onSearchStateChange}
            />
            <SearchBox />
            <Button
              title="Show Filters Modal"
              color="red"
              onPress={this.toggleModal}
            />
            <InfiniteHits />
          </InstantSearch>
        </View>
      </SafeAreaView>
    );
  }
}

export default App;
