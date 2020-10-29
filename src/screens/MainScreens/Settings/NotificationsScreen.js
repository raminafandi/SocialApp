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
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title}</Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification(expoPushToken);
        }}
      />
    </View>
  );

  async function schedulePushNotification(token) {
    await Notifications.scheduleNotificationAsync({
      content: {
        to: token,
        title: 'TTOK-O! 📬',
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 1 },
    });
  }
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
