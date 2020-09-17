import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import LoadingScreen from '../OtherScreens/LoadingScreen';
import Post from '../../components/Post';
import { useFonts } from 'expo-font';
import { hsize } from '../../entities/constants';
import * as lookApi from '../../services/api/look';
import { getUserInfo } from '../../services/api/user';
import InfiniteScroll from '../../components/InfinityScroll';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = React.memo(function ({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [fontLoaded] = useFonts({
    myfont: require('../../assets/fonts/Rubik-Italic-VariableFont_wght.ttf'),
  });
  useEffect(() => {
    getUserInfo().then((doc) => setUserInfo(doc.data())).then(() => setLoading(false));
  }, []);
  if (loading || !fontLoaded) {
    return <LoadingScreen fullscreen />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={{ fontFamily: 'myfont' }}></Text>
      <InfiniteScroll navigation={navigation} userInfo={userInfo} fetchData={lookApi.getLooksForHomeScreen} fetchMore={lookApi.getMoreLooksForHomeScreen} orderBy="date"/>
    </SafeAreaView>
  );
});

export default HomeScreen;
