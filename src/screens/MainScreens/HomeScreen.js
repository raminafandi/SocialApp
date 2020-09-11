import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import LoadingScreen from '../OtherScreens/LoadingScreen';
import Post from '../../components/Post';


import * as lookApi from '../../services/api/look';



const HomeScreen = React.memo(function ({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
    fetchData().then((allData) => {
      setData(allData);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <LoadingScreen fullscreen />;
  }
  return (
    <View style={{flex:1}}>
      <FlatList
        data={data}
        onRefresh={() => {
          setLoading(true);
          fetchData().then((res) => {
            setData(res);
            setLoading(false);
          });
        }}
        refreshing={loading}
        renderItem={({ item }) => <Post look={item} navigation={navigation} />}
      />
    </View>
  );
});
export default HomeScreen;
