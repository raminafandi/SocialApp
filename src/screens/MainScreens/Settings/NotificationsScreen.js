import React, { useContext } from 'react';
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
import TextButton from '../../../components/TextButton';
import { AuthContext } from '../../../services/context/AuthContext';

const MainScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const iconSize = 30;
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
    backgroundColor: 'white',
  },
  iconStyle: {
    marginRight: wsize(24),
  },
  logins: {
    padding: 4,
    borderBottomWidth: 1,
    borderColor: '#DADBDA',
  },
  loginsText: {
    fontSize: wsize(18),
    paddingLeft: wsize(21),
    fontWeight: 'bold',
  },
});
export default MainScreen;
