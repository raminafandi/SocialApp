import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import LoadingScreen from '../OtherScreens/LoadingScreen';
import Post from '../../components/Post';


import * as lookApi from '../../services/api/look';
import { getUserInfo } from '../../services/api/user'


const HomeScreen = React.memo(function ({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null)
  const fetchData = () => {
    return lookApi.getLooksForHomeScreen().then((querySnapshot) => {
      const allData = [];
      querySnapshot.forEach(doc => {
        allData.push({ id: doc.id, ...doc.data() });
      });
      return allData;
    });
  };
  useEffect(() => {
    Promise.all([
      fetchData().then((allData) => {
        setData(allData);
      })
      ,
      getUserInfo().then(doc => setUserInfo(doc.data()))
    ]
    ).then(() => setLoading(false))
  }, []);
  if (loading) {
    return <LoadingScreen fullscreen />;
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        onRefresh={() => {
          setLoading(true);
          Promise.all([
            fetchData().then((allData) => {
              setData(allData);
            })
            ,
            getUserInfo().then(doc => setUserInfo(doc.data()))
          ]
          ).then(() => setLoading(false))
        }}
        refreshing={loading}
        renderItem={({ item }) => <Post look={item} navigation={navigation} userInfo={userInfo} />}
      />
    </View>
  );
});
export default HomeScreen;
