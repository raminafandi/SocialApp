import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import LoadingScreen from '../OtherScreens/LoadingScreen';
import * as lookApi from '../../services/api/look';
import { getUserInfo } from '../../services/api/user';
import InfiniteScroll from '../../components/InfinityScroll';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = React.memo(function ({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    getUserInfo()
      .then((doc) => setUserInfo(doc.data()))
      .then(() => setLoading(false));
  }, []);
  if (loading) {
    return <LoadingScreen fullscreen />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <InfiniteScroll
        navigation={navigation}
        userInfo={userInfo}
        fetchData={lookApi.getLooksForHomeScreen}
        fetchMore={lookApi.getMoreLooksForHomeScreen}
        orderBy="date"
      />
    </SafeAreaView>
  );
});

export default HomeScreen;
