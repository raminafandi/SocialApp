import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import LoadingScreen from '../OtherScreens/LoadingScreen';
import Post from '../../components/Post';
import { useFonts } from 'expo-font';

import * as lookApi from '../../services/api/look';
import { getUserInfo } from '../../services/api/user';
import InfiniteScroll from './InfinityScroll';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = React.memo(function ({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [fontLoaded] = useFonts({
    myfont: require('../../assets/fonts/Rubik-Italic-VariableFont_wght.ttf'),
  });
  const fetchData = () => {
    return lookApi.getLooksForHomeScreen().then((querySnapshot) => {
      const allData = [];
      querySnapshot.forEach((doc) => {
        allData.push({ id: doc.id, ...doc.data() });
      });
      return allData;
    });
  };
  useEffect(() => {
    Promise.all([
      fetchData().then((allData) => {
        setData(allData);
      }),
      getUserInfo().then((doc) => setUserInfo(doc.data())),
    ]).then(() => setLoading(false));
  }, []);
  if (loading || !fontLoaded) {
    return <LoadingScreen fullscreen />;
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white', paddingTop: hsize(20) }}>
      <Text style={{ fontFamily: 'myfont' }}></Text>
      <FlatList
        data={data}
        onRefresh={() => {
          setLoading(true);
          Promise.all([
            fetchData().then((allData) => {
              setData(allData);
            }),
            getUserInfo().then((doc) => setUserInfo(doc.data())),
          ]).then(() => setLoading(false));
        }}
        refreshing={loading}
        renderItem={({ item }) => (
          <Post look={item} navigation={navigation} userInfo={userInfo} />
        )}
      />
      <InfiniteScroll navigation={navigation} userInfo={userInfo} />
    </SafeAreaView>
  );
});

export default HomeScreen;
