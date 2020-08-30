import React, { useState, useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import AddPostScreen from '../../screens/MainScreens/AddPostScreen';
import AddPhotoScreen from '../../screens/MainScreens/AddPhotoScreen';

const AddPostStack = createStackNavigator();

export default function ProfileStackScreen() {
  return (
    <AddPostStack.Navigator>
      <AddPostStack.Screen name="AddPost" component={AddPostScreen} />
      <AddPostStack.Screen name="AddPhoto" component={AddPhotoScreen} />
    </AddPostStack.Navigator>
  );
}
