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
import TextButton from '../../components/TextButton'
import Button from '../../components/Button'
import Input from '../../components/Input'
const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.mainContainer}>
        <Input
          placeholder="Mobile Number or Email"
        />
        <Input placeholder="Full Name" />
        <Input placeholder="Username" />
        <Input
          placeholder="Password"
          secureTextEntry
        />
        <Button
          title="Sign Up"
        />
        <View style={styles.getHelpContainer}>
          <Text style={styles.getHelpText}>Forgot your login details? </Text>
          <TextButton>Get help signing in</TextButton>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.getHelpText}>Already have an account?</Text>
        <TextButton onPress={() => navigation.navigate('Login')}>Log In</TextButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
