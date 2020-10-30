import React, { useState, useEffect } from 'react';
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
  Switch,
} from 'react-native';

import { window, wsize, hsize } from '../../../entities/constants';
import FontText from '../../../components/FontText';
import {
  makePrivate,
  makePublic,
  isPrivateUser,
} from '../../../services/api/user';
import LaodingScreen from '../../OtherScreens/LoadingScreen';
const PrivacyScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    isPrivateUser()
      .then((privacy) => {
        setIsEnabled(privacy);
      })
      .finally(() => setLoading(false));
  }, []);
  const handleSwitch = () => {
    if (isEnabled) makePublic();
    else makePrivate();
    setIsEnabled(!isEnabled);
  };
  if (loading) return <LaodingScreen fullscreen />;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <FontText font="Rubik" style={styles.optionName}>
            Private Account
          </FontText>
          <Switch
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleSwitch}
            value={isEnabled}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hsize(24),
  },
  row: {
    width: window.width,
    justifyContent: 'space-between',
    paddingHorizontal: wsize(24),
    flexDirection: 'row',
  },
  optionName: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.3,
    color: '#262626',
  },
});
export default PrivacyScreen;
