import React, { useState, useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import AddPostScreen from '../../screens/MainScreens/AddPostScreen';
import AddPhotoScreen from '../../screens/MainScreens/AddPhotoScreen';
import AddItemScreen from '../../screens/MainScreens/AddItemScreen';
import SearchLookScreen from '../../screens/MainScreens/SearchLookScreen';
import PhotoGrid from '../../screens/MainScreens/PhotoGrid';
import PhotoCarousel from '../../screens/MainScreens/PhotoCarousel';
const AddPostStack = createStackNavigator();

export default function ProfileStackScreen() {
  return (
    <AddPostStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F9FAF9"
        }
      }}>
      <AddPostStack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          headerShown: false,
        }}
      />
      <AddPostStack.Screen name="AddPhoto" component={AddPhotoScreen} />
      <AddPostStack.Screen name="AddItem" component={AddItemScreen} />
      <AddPostStack.Screen name="SearchLook" component={SearchLookScreen} />
      <AddPostStack.Screen name="PhotoGrid" component={PhotoGrid} />
      <AddPostStack.Screen name="PhotoCarousel" component={PhotoCarousel} />
    </AddPostStack.Navigator>
  );
}
