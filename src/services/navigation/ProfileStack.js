import React, { useState, useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/MainScreens/ProfileScreen';
import OtherProfileScreen from '../../screens/MainScreens/OtherProfileScreen';
import ItemScreen from '../../screens/MainScreens/ItemScreen';
import EditProfileScreen from '../../screens/MainScreens/EditProfileScreen';
import SettingsScreen from '../../screens/MainScreens/Settings/MainScreen';
import HelpScreen from '../../screens/MainScreens/Settings/HelpScreen';
import AboutScreen from '../../screens/MainScreens/Settings/AboutScreen';
import NotificationsScreen from '../../screens/MainScreens/Settings/NotificationsScreen';
import PrivacyScreen from '../../screens/MainScreens/Settings/PrivacyScreen';
import LookScreen from '../../screens/MainScreens/Look/LookScreen';
import AlternativeLookScreen from '../../screens/MainScreens/AlternativeLookScreen';

import SecurityScreen from '../../screens/MainScreens/Settings/SecurityScreen';
import FollowRequestsScreen from '../../screens/MainScreens/FollowRequestsScreen';
import AddFriendScreen from '../../screens/MainScreens/AddFriendScreen';

const ProfileStack = createStackNavigator();
export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F9FAF9',
        },
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen name="Item" component={ItemScreen} />
      <ProfileStack.Screen name="OtherProfile" component={OtherProfileScreen} />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: 'Edit Profile', headerTitleAlign: 'center' }}
      />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
      <ProfileStack.Screen name="Privacy" component={PrivacyScreen} />
      <ProfileStack.Screen name="Security" component={SecurityScreen} />
      <ProfileStack.Screen name="Help" component={HelpScreen} />
      <ProfileStack.Screen name="About" component={AboutScreen} />
      <ProfileStack.Screen name="Look" component={LookScreen} />
      <ProfileStack.Screen name="AddFriend" component={AddFriendScreen} />
      <ProfileStack.Screen
        name="AlternativeLook"
        component={AlternativeLookScreen}
      />
      <ProfileStack.Screen
        name="FollowRequests"
        component={FollowRequestsScreen}
      />
    </ProfileStack.Navigator>
  );
}
