import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { window, wsize, hsize } from '../../entities/constants';
import { AuthContext } from '../../services/context/AuthContext';
import Logo from '../../components/Logo';
import TextButton from '../../components/TextButton';
import Button from '../../components/Button';
import Input from '../../components/Input';
const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const authContext = useContext(AuthContext);

  const authHandler = (email, fullName, userName, password) => {
    if (
      email === '' ||
      password === '' ||
      fullName == '' ||
      userName == '' ||
      confPassword
    ) {
      Alert.alert('Wrong Credentials', 'Empty Fields.');
    } else if (password !== confPassword) {
      Alert.alert('Wrong Credentials', 'Passwords do not match.');
    } else if (email) {
      const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      if (!expression.test(String(email).toLowerCase())) {
        Alert.alert('Wrong Credentials', 'Wrong Email Format.');
      } else {
        authContext.register(email, password, userName, fullName);
      }
    }
  };
  return (
    <>
      <Logo />
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Input
            placeholder="Mobile Number or Email"
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Full Name"
            onChangeText={(text) => setFullName(text)}
          />
          <Input
            placeholder="Username"
            onChangeText={(text) => setUserName(text)}
          />
          <Input
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <Input
            placeholder="Confirm Password"
            onChangeText={(text) => setConfPassword(text)}
            secureTextEntry
          />
          <Button
            title="Sign Up"
            style={{ backgroundColor: '#52BDEB', marginTop: wsize(5) }}
            titleStyle={{ color: 'white' }}
            onPress={() =>
              authHandler(email, fname, uname, password, confPassword)
            }
          />
          <View style={styles.getHelpContainer}>
            <Text style={styles.getHelpText}>Forgot your login details? </Text>
            <TextButton>Get help signing in</TextButton>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.getHelpText}>Already have an account?</Text>
          <TextButton onPress={() => navigation.navigate('Login')}>
            Log In
          </TextButton>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
