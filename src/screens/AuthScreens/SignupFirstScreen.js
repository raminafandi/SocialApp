import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import TextButton from '../../components/TextButton';
import { window, wsize, hsize } from '../../entities/constants';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const iconSize = wsize(24);
  return (
    <>
      <Logo />
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Button
            icon={
              <Ionicons
                name="md-person"
                size={iconSize}
                color="black"
                style={styles.iconStyle}
              />
            }
            title="Use phone or email"
            style={styles.additionalButton}
            titleStyle={styles.titleStyle}
            onPress={() => navigation.navigate('Signup')}
          />
          <Button
            icon={
              <Entypo
                name="facebook"
                size={iconSize}
                color="#4267B2"
                style={styles.iconStyle}
              />
            }
            title="Continue with Facebook"
            style={styles.additionalButton}
            titleStyle={styles.titleStyle}
          />
          <Button
            icon={
              <AntDesign
                name="google"
                size={iconSize}
                color="black"
                style={styles.iconStyle}
              />
            }
            title="Continue with Google "
            style={styles.additionalButton}
            titleStyle={styles.titleStyle}
          />
        </View>
        <View>
          <View style={styles.termsView}>
            <Text style={styles.termsText}>
              By signing up, you agree to Looks'Terms of Use and confirm that
              you have read Looks'Privacy Policy
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.getHelpText}>Already have an account?</Text>
            <TextButton onPress={() => navigation.navigate('Login')}>
              Log In
            </TextButton>
          </View>
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
  termsView: {
    marginTop: hsize(20),
    marginHorizontal: wsize(45),
  },
  termsText: {
    textAlign: 'center',
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    height: hsize(79),
    width: '100%',
    borderColor: '#DADBDA',
  },
  additionalButton: {
    justifyContent: 'flex-start',
    backgroundColor: '#FCF9FC',
    borderColor: '#DADBDA',
    borderWidth: 1,
    borderRadius: 6,
  },
  iconStyle: {
    marginLeft: wsize(15),
    marginRight: wsize(20),
  },
  titleStyle: {
    color: '#313131',
    // fontFamily: 'Rubik',
    fontWeight: '500',
    fontSize: wsize(15),
  },
});

export default LoginScreen;
