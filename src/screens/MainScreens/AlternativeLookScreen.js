import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Post from '../../components/Post';

const HomeScreen = React.memo(function ({ navigation, route }) {
  const item = route.params;
  return (
    <View style={{ flex: 1 }}>
      <Post look={item} navigation={navigation} />
    </View>
  );
});
export default HomeScreen;
