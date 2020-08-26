import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import {
  window,
  wsize,
  hsize,
} from '../../entities/constants'

const HomeScreen = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
