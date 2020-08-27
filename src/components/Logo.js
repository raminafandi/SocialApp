import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { window, wsize, hsize } from '../entities/constants';
import { LinearGradient } from 'expo-linear-gradient';

export default function () {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#52BDEB', '#0148FF']}
      start={[0, 1]}
      end={[1, 1]}
      style={styles.gradientStyle}>
      <Text style={styles.headerText}>looks</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: wsize(48),
    lineHeight: wsize(46),
    fontWeight: 'bold',
    color: 'white',
  },
  gradientStyle: {
    height: hsize(176),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
