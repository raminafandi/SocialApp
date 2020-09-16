import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';

import { window, wsize, hsize } from '../../entities/constants';
import { FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Request from '../../components/Request';
import { getSubRequestForPrivateUser } from '../../services/api/user';
import LoadingScreen from '../OtherScreens/LoadingScreen';

const FollowRequestsScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getSubRequestForPrivateUser().then((allData) => {
      setRequests(allData);
      setLoading(false);
    });
  }, []);
  if (loading) return <LoadingScreen fullscreen />;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={requests}
          refreshing={loading}
          keyExtractor={(item, index) => item}
          renderItem={({ item }) => <Request userId={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hsize(24),
    justifyContent: 'space-between',
  },
});
export default FollowRequestsScreen;
