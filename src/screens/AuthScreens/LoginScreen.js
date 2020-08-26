import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TextButton from '../../components/TextButton'
import { window, wsize, hsize } from '../../entities/constants';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from '../../services/context/AuthContext'

const LoginScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.mainContainer}>
        <Input
          placeholder="Phone Number, username or email"
        />
        <Input
          placeholder="Password"
          secureTextEntry
        />
        <Button
          title="Login"
          onPress={authContext.login}
        />
        <View style={styles.getHelpContainer}>
          <Text style={styles.getHelpText}>Forgot your login details? </Text>
          <TextButton>Get help signing in</TextButton>
        </View>
      </View>
      <View style={{ marginTop: hsize(24), alignItems: 'center' }}>
        <Text style={{ color: '#939094', fontSize: 18, fontWeight: '500' }}>
          or
        </Text>
      </View>
      <TouchableOpacity style={styles.getHelpContainer}>
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
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.getHelpText}>Don't have an account?</Text>
        <TextButton onPress={() => navigation.navigate('SignupFirst')}>
          Sign up
        </TextButton>
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
    paddingTop: hsize(30),
    paddingBottom: hsize(33),
    width: '100%',
    borderColor: '#DADBDA',
  },
});

export default LoginScreen;
