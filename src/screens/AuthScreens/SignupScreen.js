import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { window, wsize, hsize } from '../../entities/constants';
import { AuthContext } from '../../services/context/AuthContext'
import Logo from '../../components/Logo';
import TextButton from '../../components/TextButton'
import Button from '../../components/Button'
import Input from '../../components/Input'
const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const authContext = useContext(AuthContext)
  return (
    <>
      <Logo />
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Input
            placeholder="Mobile Number or Email"
            onChangeText={text => setEmail(text)}
          />
          <Input placeholder="Full Name" />
          <Input placeholder="Username"
            onChangeText={text => setUserName(text)}
          />
          <Input
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <Button
            title="Sign Up"
            style={{ backgroundColor: '#52BDEB', marginTop: wsize(5) }}
            titleStyle={{ color: 'white' }}
            onPress={() => authContext.register(email, password, userName)}
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
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
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
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    width: '100%',
    height: hsize(79),
    borderColor: '#DADBDA',
  },
});

export default SignupScreen;
