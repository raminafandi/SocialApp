import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { window, wsize, hsize } from '../../entities/constants';
import Logo from '../../components/Logo'

const LoginScreen = ({ }) => {
  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
};

const styles = StyleSheet.create({


});

export default LoginScreen;
