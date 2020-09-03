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
import {
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from '@expo/vector-icons';
import Option from '../../../components/Option';

const MainScreen = ({ navigation }) => {
  const iconSize = 30;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Option
          title="Notifications"
          navigation={navigation}
          navigateTo="Notifications">
          <MaterialIcons
            name="notifications-none"
            size={iconSize}
            color="black"
            style={styles.iconStyle}
          />
        </Option>
        <Option title="Privacy" navigation={navigation} navigateTo="Privacy">
          <MaterialIcons
            name="person"
            size={iconSize}
            color="black"
            style={styles.iconStyle}
          />
        </Option>
        <Option title="Security" navigation={navigation} navigateTo="Security">
          <MaterialCommunityIcons
            name="shield-lock-outline"
            size={iconSize}
            color="black"
            style={styles.iconStyle}
          />
        </Option>
        <Option title="Help" navigation={navigation} navigateTo="Help">
          <AntDesign
            name="questioncircleo"
            size={iconSize}
            color="black"
            style={styles.iconStyle}
          />
        </Option>
        <Option title="About" navigation={navigation} navigateTo="About">
          <AntDesign
            name="infocirlceo"
            size={iconSize}
            color="black"
            style={styles.iconStyle}
          />
        </Option>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hsize(24),
  },
  iconStyle: {
    marginRight: wsize(24),
  },
});
export default MainScreen;
