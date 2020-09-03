import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

import { window, wsize, hsize } from '../../../entities/constants';
import { FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Option from '../../../components/Option';

const SecurityScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}></ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hsize(24),
  },
});
export default SecurityScreen;
