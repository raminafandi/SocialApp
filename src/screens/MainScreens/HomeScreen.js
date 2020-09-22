import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Text } from 'react-native';
import LoadingScreen from '../OtherScreens/LoadingScreen';
import * as lookApi from '../../services/api/look';
import { getUserInfo } from '../../services/api/user';
import InfiniteScroll from '../../components/InfinityScroll';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AuthContext} from '../../services/context/AuthContext'
const HomeScreen = React.memo(function ({ navigation }) {
  const { userExtraInfo } = useContext(AuthContext)
  if (!userExtraInfo) {
    return <LoadingScreen fullscreen />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <InfiniteScroll
        navigation={navigation}
        userInfo={userExtraInfo}
        fetchData={lookApi.getLooksForHomeScreen}
        fetchMore={lookApi.getMoreLooksForHomeScreen}
        orderBy="date"
      />
    </SafeAreaView>
  );
});

export default HomeScreen;
