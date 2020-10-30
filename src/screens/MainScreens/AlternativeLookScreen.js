import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Post from '../../components/Post';
import { getUserInfo } from '../../services/api/user';
import LoadingScreen from '../OtherScreens/LoadingScreen';

const AlternativeLookScreen = React.memo(function ({ navigation, route }) {
  const item = route.params.item;
  const fromOtherProfile = route.params.fromOtherProfile
  console.log('item: ', item)
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    getUserInfo().then((doc) => setUserInfo(doc.data()));
  }, []);
  if (userInfo)
    return (
      <ScrollView
        style={{ flex: 1, paddingVertical: 10, backgroundColor: '#FFFEFE' }}>
        <Post
          look={item}
          userInfo={userInfo}
          navigation={navigation}
          fromProfile
          fromOtherProfile={fromOtherProfile}
        />
      </ScrollView>
    );
  return <LoadingScreen />;
});

export default AlternativeLookScreen;
