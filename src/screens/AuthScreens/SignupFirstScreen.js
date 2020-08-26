import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TextButton from '../../components/TextButton';
import { window, wsize, hsize } from '../../entities/constants';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.mainContainer}>
        <Button
          icon={
            <Ionicons
              name="md-person"
              size={24}
              color="black"
              style={{ position: 'absolute', left: wsize(16) }}
            />
          }
          title="Use phone or email"
          style={styles.additionalButton}
          titleStyle={{
            color: '#313131',
          }}
          onPress={() => navigation.navigate('Signup')}
        />
        <Button
          icon={
            <Entypo
              name="facebook"
              size={24}
              color="#4267B2"
              style={{ position: 'absolute', left: wsize(16) }}
            />
          }
          title="Continue with Facebook"
          style={styles.additionalButton}
          titleStyle={{ color: '#313131' }}
        />
        <Button
          icon={
            <AntDesign
              name="google"
              size={24}
              color="black"
              style={{ position: 'absolute', left: wsize(16) }}
            />
          }
          title="Continue with Google "
          style={styles.additionalButton}
          titleStyle={{ color: '#313131' }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.getHelpText}>Already have an account?</Text>
        <TextButton onPress={() => navigation.navigate('Login')}>
          Log In
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
    padding: 20,
    width: '100%',
    borderColor: '#DADBDA',
  },
  additionalButton: {
    justifyContent: 'center',
    backgroundColor: '#FCF9FC',
    borderColor: '#DADBDA',
    borderWidth: 1,
    borderRadius: 6,
  },
});

export default LoginScreen;
