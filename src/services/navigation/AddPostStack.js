import React, { useState, useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import AddPostScreen from '../../screens/MainScreens/AddPostScreen';
import AddPhotoScreen from '../../screens/MainScreens/AddPhotoScreen';
import AddItemScreen from '../../screens/MainScreens/AddItemScreen';
import SearchLookScreen from '../../screens/MainScreens/Look/SearchLookScreen';
import ItemScreen from '../../screens/MainScreens/ItemScreen';
import AlbumScreen from '../../screens/MainScreens/Look/AlbumScreen';
import AddLookScreen from '../../screens/MainScreens/Look/AddLookScreen';
import LookScreen from '../../screens/MainScreens/Look/LookScreen';
import { ItemProvider, ItemContext } from '../context/ItemContext';
import { useNavigation } from '@react-navigation/native';
const AddPostStack = createStackNavigator();

export default function ProfileStackScreen() {
  const navigation = useNavigation();
  const itemContext = useContext(ItemContext);
  return (
    <ItemProvider>
      <ItemContext.Consumer>
        {({ selectItem, selectedItems, clearSelectedItems }) => (
          <AddPostStack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#F9FAF9',
              },
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
            <AddPostStack.Screen
              name="SearchLook"
              component={SearchLookScreen}
            />
            <AddPostStack.Screen name="Album" component={AlbumScreen} />
            <AddPostStack.Screen name="AddLook" component={AddLookScreen} />
            <AddPostStack.Screen name="Item" component={ItemScreen} />
            <AddPostStack.Screen name="Look" component={LookScreen} />
          </AddPostStack.Navigator>
        )}
      </ItemContext.Consumer>
    </ItemProvider>
  );
}
