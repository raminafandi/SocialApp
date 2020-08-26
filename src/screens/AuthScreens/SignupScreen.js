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

const SignupScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.mainContainer}>
        <View style={styles.userNameContainer}>
          <TextInput
            style={styles.userNameInput}
            placeholder="Mobile Number or Email"
          />
        </View>
        <View style={styles.userNameContainer}>
          <TextInput style={styles.userNameInput} placeholder="Full Name" />
        </View>
        <View style={styles.userNameContainer}>
          <TextInput style={styles.userNameInput} placeholder="Username" />
        </View>
        <View style={styles.userNameContainer}>
          <TextInput
            style={styles.userNameInput}
            placeholder="Password"
            secureTextEntry
          />
        </View>
        <Button
          title="Sign Up"
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

      <View style={styles.bottomContainer}>
        <Text style={styles.getHelpText}>Already have an account?</Text>
        <Text style={styles.getHelpLink}>Log In</Text>
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
    marginLeft: wsize(3),
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
