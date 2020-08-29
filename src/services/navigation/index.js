import React, { useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/MainScreens/HomeScreen';
import ProfileScreen from '../../screens/MainScreens/ProfileScreen';
import ItemScreen from '../../screens/MainScreens/ItemScreen';
import AddPostScreen from '../../screens/MainScreens/AddPostScreen';
import LoginScreen from '../../screens/AuthScreens/LoginScreen';
import SignupScreen from '../../screens/AuthScreens/SignupScreen';
import SignupFirstScreen from '../../screens/AuthScreens/SignupFirstScreen';
import LoadingScreen from '../../screens/OtherScreens/LoadingScreen';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

const AuthFlow = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="SignupFirst" component={SignupFirstScreen} />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
  </AuthStack.Navigator>
);

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
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
    </ProfileStack.Navigator>
  );
}
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
        {({ auhtenticated, loading }) => (
          <NavigationContainer>
            {loading ? (
              <LoadingScreen />
            ) : auhtenticated ? (
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
