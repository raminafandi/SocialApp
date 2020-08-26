import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../../screens/MainScreens/HomeScreen';
import ProfileScreen from '../../screens/MainScreens/ProfileScreen';
import AddPostScreen from '../../screens/MainScreens/AddPostScreen';
import LoginScreen from '../../screens/AuthScreens/LoginScreen';
import SignupScreen from '../../screens/AuthScreens/SignupScreen';

import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

const AuthFlow = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
  </AuthStack.Navigator>
)

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
      component={AddPostScreen}
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
  const [auth, setAuth] = useState(true)
  return (
    <NavigationContainer>
      {
        auth ?
          <AuthFlow />
          :
          <TabNav />
      }
    </NavigationContainer>
  );
}
