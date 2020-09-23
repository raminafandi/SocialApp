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
export default function SubsScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserSubs().then((allData) => {
      console.log(allData);
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
            <TouchableOpacity
              style={styles.postHeaderFirst}
              onPress={() => {
                navigation.navigate('OtherProfile', {
                  user: {
                    id: item.objectID,
                    photo: item.photoURL,
                    userName: item.userName,
                  },
                });
              }}>
              <Image
                source={{ uri: item.photoURL }}
                style={{ height: 50, width: 50, borderRadius: 25 }}
              />
              <Text style={styles.postHeaderProfileName}>{item.userName}</Text>
            </TouchableOpacity>
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
});
