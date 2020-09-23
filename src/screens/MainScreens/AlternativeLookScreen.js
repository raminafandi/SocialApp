import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Post from '../../components/Post';
import { getUserInfo } from '../../services/api/user';
import LoadingScreen from '../OtherScreens/LoadingScreen';

const AlternativeLookScreen = React.memo(function ({ navigation, route }) {
  const item = route.params;
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    getUserInfo().then((doc) => setUserInfo(doc.data()));
  }, []);
  if (userInfo)
    return (
      <View style={{ flex: 1 }}>
        <Post look={item} userInfo={userInfo} />
      </View>
    );
  return <LoadingScreen />;
});
export default AlternativeLookScreen;
