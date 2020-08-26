import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/MainScreens/HomeScreen';
import ProfileScreen from '../../screens/MainScreens/ProfileScreen';
import ExploreScreen from '../../screens/MainScreens/ExploreScreen';
import LoginScreen from '../../screens/AuthScreens/LoginScreen';
import SignupScreen from '../../screens/AuthScreens/SignupScreen';

import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNav = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
    }}>
    <Tab.Screen
      name="Home"
      component={LoginScreen}
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
      component={SignupScreen}
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
      component={ProfileScreen}
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

export default function navigation() {
  return (
    <NavigationContainer>
      <TabNav />
    </NavigationContainer>
  );
}
