import React, { useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import HomeScreen from '../../screens/MainScreens/HomeScreen';
import LoadingScreen from '../../screens/OtherScreens/LoadingScreen';
import { AuthContext, AuthProvider } from '../context/AuthContext';

import ProfileStackScreen from './ProfileStack';
import AuthFlow from './AuthStack';
import AddPostStack from './AddPostStack';

const Tab = createBottomTabNavigator();

const TabNav = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused, size }) => (
          <AntDesign
            name="home"
            size={size}
            color={focused ? 'blue' : 'black'}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Add Post"
      component={AddPostStack}
      options={{
        tabBarIcon: ({ focused, size }) => (
          <Ionicons
            name="ios-add-circle-outline"
            size={size}
            color={focused ? 'blue' : 'black'}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarIcon: ({ focused, size }) => (
          <MaterialIcons
            name="person-outline"
            size={size}
            color={focused ? 'blue' : 'black'}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default React.memo(function navigation() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ authenticated, loading }) => (
          <NavigationContainer>
            {loading ? (
              <LoadingScreen fullscreen />
            ) : authenticated ? (
              <TabNav />
            ) : (
                  <AuthFlow />
                )}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
});
