import React, { useState, useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/MainScreens/ProfileScreen';
import ItemScreen from '../../screens/MainScreens/ItemScreen';
import EditProfileScreen from '../../screens/MainScreens/EditProfileScreen';

const ProfileStack = createStackNavigator();
export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen name="Item" component={ItemScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    </ProfileStack.Navigator>
  );
}
