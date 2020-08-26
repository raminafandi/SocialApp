import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { window, wsize, hsize } from '../../entities/constants';
import Logo from '../../components/Logo';
import { Button } from 'react-native-elements';

import { Entypo } from '@expo/vector-icons';

const SignupScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.mainContainer}>
        <View style={styles.userNameContainer}>
          <TextInput
            style={styles.userNameInput}
            placeholder="Phone Number, username or email"
          />
        </View>
        <View style={styles.userNameContainer}>
          <TextInput
            style={styles.userNameInput}
            placeholder="Password"
            secureTextEntry
          />
        </View>
        <Button
          title="Login"
          buttonStyle={{
            marginHorizontal: wsize(34),
            marginTop: hsize(13),
            borderRadius: 4,
            padding: 10,
          }}
          titleStyle={{}}
        />
        <View style={styles.getHelpContainer}>
          <Text style={styles.getHelpText}>Forgot your login details? </Text>
          <TouchableOpacity>
            <Text style={styles.getHelpLink}>Get help signing in</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: hsize(24), alignItems: 'center' }}>
        <Text style={{ color: '#939094', fontSize: 18, fontWeight: '500' }}>
          or
        </Text>
      </View>
      <TouchableOpacity>
        <View style={styles.getHelpContainer}>
          <Entypo name="facebook" size={28} color="#4267B2" />
          <Text
            style={{
              alignSelf: 'center',
              marginLeft: wsize(8),
              fontSize: 18,
              fontWeight: 'bold',
              color: '#52BDEB',
            }}>
            Log In With Facebook
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.getHelpText}>Don't have an account?</Text>
        <Text style={styles.getHelpLink}>Sign up</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userNameContainer: {
    borderColor: '#ececec',
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderRadius: 5,
    height: hsize(68),
    justifyContent: 'center',
    marginHorizontal: wsize(34),
    marginBottom: hsize(2),
  },
  userNameInput: {
    marginStart: 10,
  },
  mainContainer: {
    marginTop: hsize(54),
    justifyContent: 'center',
  },
  getHelpContainer: {
    marginTop: hsize(10),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  getHelpText: {
    color: '#939094',
  },
  getHelpLink: {
    color: '#52BDEB',
    fontWeight: 'bold',
  },
  bottomContainer: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    borderTopWidth: 1,
    padding: 20,
    width: '100%',
    borderColor: '#DADBDA',
  },
});

export default SignupScreen;
