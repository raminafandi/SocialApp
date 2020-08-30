import React, { useState, useContext } from 'react';

import LoginScreen from '../../screens/AuthScreens/LoginScreen';
import SignupScreen from '../../screens/AuthScreens/SignupScreen';
import SignupFirstScreen from '../../screens/AuthScreens/SignupFirstScreen';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

export default AuthFlow = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="SignupFirst" component={SignupFirstScreen} />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
  </AuthStack.Navigator>
);
