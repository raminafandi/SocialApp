import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { getUserSubs } from '../../services/api/user';
import { wsize, hsize } from '../../entities/constants';
import LoadingScreen from '../OtherScreens/LoadingScreen';
export default function SubsScreen(navigation) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserSubs().then((querySnapshot) => {
      const allData = [];
      querySnapshot.forEach((doc) => {
        allData.push({ key: doc.id, ...doc.data() });
      });
      setData(allData);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={data}
          refreshing={loading}
          renderItem={({ item }) => (
            <View style={styles.postHeaderContainer}>
              <TouchableOpacity
                style={styles.postHeaderFirst}
                onPress={() => {
                  navigation.navigation.navigate('OtherProfile', {
                    user: {
                      id: item.key,
                      photo: item.photoURL,
                      userName: item.userName,
                    },
                  });
                }}>
                <Image
                  source={{ uri: item.photoURL }}
                  style={{ height: 50, width: 50, borderRadius: 25 }}
                />
                <Text style={styles.postHeaderProfileName}>
                  {item.userName}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hsize(24),
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
