import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { window, wsize, hsize } from '../../entities/constants';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({}) => {
  return (
    <View style={styles.container}>
      <View>
        <LinearGradient
          // Background Linear Gradient
          colors={['#39A2AE', '#7209b7']}
          start={[0, 1]}
          end={[1, 1]}
          style={{
            height: hsize(220),
            padding: 15,
            alignItems: 'center',
            borderRadius: 5,
            justifyContent: 'center',
          }}>
          <Text style={styles.headerText}>looks</Text>
        </LinearGradient>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default LoginScreen;
