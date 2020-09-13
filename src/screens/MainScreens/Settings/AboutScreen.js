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
import Request from '../../../components/Request';
import TextButton from '../../../components/TextButton';
const AboutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Request />
          <Request />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hsize(24),
    justifyContent: 'space-between',
  },
  postHeaderIcon: {
    width: wsize(40),
    height: wsize(40),
    borderRadius: wsize(20),
    marginRight: wsize(8),
    alignSelf: 'center',
  },
  bottomContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    height: hsize(50),
    width: '100%',
    borderColor: '#DADBDA',
    paddingHorizontal: wsize(10),
    paddingVertical: hsize(10),
  },
  textInput: {
    width: wsize(250),
  },
});
export default AboutScreen;
