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
      <ScrollView style={styles.container}>
        <Option
          title="Notifications"
          navigation={navigation}
          textStyle={{ fontWeight: 'bold' }}
          navigateTo="Notifications">
          <MaterialIcons
            name="notifications-none"
            size={iconSize}
            color="black"
            style={styles.iconStyle}
          />
        </Option>
        <Option
          title="Privacy"
          navigation={navigation}
          textStyle={{ fontWeight: 'bold' }}
          navigateTo="Privacy">
          <MaterialIcons
            name="person"
            size={iconSize}
            color="black"
            style={styles.iconStyle}
          />
        </Option>
        <Option
          title="Security"
          textStyle={{ fontWeight: 'bold' }}
          navigation={navigation}
          navigateTo="Security">
          <MaterialCommunityIcons
            name="shield-lock-outline"
            size={iconSize}
            color="black"
            style={styles.iconStyle}
          />
        </Option>
        <Option
          title="Help"
          textStyle={{ fontWeight: 'bold' }}
          navigation={navigation}
          navigateTo="Help">
          <AntDesign
            name="questioncircleo"
            size={iconSize}
            color="black"
            style={styles.iconStyle}
          />
        </Option>
        <Option
          title="About"
          textStyle={{ fontWeight: 'bold' }}
          navigation={navigation}
          navigateTo="About">
          <AntDesign
            name="infocirlceo"
            size={iconSize}
            color="black"
            style={styles.iconStyle}
          />
        </Option>
        <View style={styles.logins}>
          <Text style={styles.loginsText}>Logins</Text>
        </View>
        <TextButton
          textStyle={{ fontSize: wsize(18), paddingLeft: wsize(21) }}
          onPress={authContext.logout}>
          Log Out
        </TextButton>
      </ScrollView>
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
