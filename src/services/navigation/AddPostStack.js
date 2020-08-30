import React, { useState, useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import AddPostScreen from '../../screens/MainScreens/AddPostScreen';

const AddPostStack = createStackNavigator();

export default function ProfileStackScreen() {
  return (
    <AddPostStack.Navigator>
      <AddPostStack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          headerShown: false
        }} />
    </AddPostStack.Navigator>
  );
}
