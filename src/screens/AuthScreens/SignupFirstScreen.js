import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import TextButton from '../../components/TextButton';
import { window, wsize, hsize } from '../../entities/constants';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import libFirebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import firebase from '../../services/firebase/index';

// const SignupFirstScreen = ({ navigation }) => {
//   const IOS_CLIENT_ID =
//     '411631689322-7ihe009nfabehldgftlj6sa84mqidtuf.apps.googleusercontent.com';
//   const ANDROID_CLIENT_ID =
//     '411631689322-pu8160rcp7vifvflhqa1c54mkt9hb40o.apps.googleusercontent.com';
//   const iconSize = wsize(24);
//   return (
//
//   );
// };

// export default SignupFirstScreen;

const IOS_CLIENT_ID =
  '411631689322-7ihe009nfabehldgftlj6sa84mqidtuf.apps.googleusercontent.com';
const ANDROID_CLIENT_ID =
  '411631689322-pu8160rcp7vifvflhqa1c54mkt9hb40o.apps.googleusercontent.com';
const iconSize = wsize(24);

export default class LoginScreen extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            libFirebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = libFirebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              console.log('user signed in ', result.user.uid);
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .firestore()
                  .collection('users')
                  .doc(result.user.uid)
                  .set({
                    fullName: result.additionalUserInfo.profile.name,
                    userName: result.user.email.substring(
                      0,
                      result.user.email.lastIndexOf('@')
                    ),
                    photoURL: result.additionalUserInfo.profile.picture,
                    status: '',
                    city: '',
                    link: '',
                    gender: '',
                    additionalInfo: '',
                    private: false,
                    friends: [],
                    subs: [],
                    saved: [],
                    looks: [],
                    items: [],
                    date: new Date(),
                  })
                  .then(function (snapshot) {
                    console.log('Snapshot', snapshot);
                  });
              }
              // else {
              //   firebase
              //     .database()
              //     .ref('/users/' + result.user.uid)
              //     .update({
              //       last_logged_in: Date.now(),
              //     });
              // }
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };
  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        // behavior: 'web',
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        // console.log('result', result);
        this.onSignIn(result);

        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log('LoginScreen.js.js 30 | Error with login', e);
      return { error: true };
    }
  };

  render(props) {
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
              onPress={() => this.props.navigation.navigate('Signup')}
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
              disabled
            />
            <TouchableOpacity
              style={styles.googleButton}
              onPress={this.signInWithGoogle}>
              <Image
                source={require('../../../assets/google-logo-9808.png')}
                style={{
                  width: wsize(24),
                  height: wsize(24),
                  marginLeft: wsize(15),
                  marginRight: wsize(20),
                }}
              />
              <View style={{ flexDirection: 'row' }}>
                <Text adjustsFontSizeToFit style={styles.googleButtonText}>
                  Continue with Google
                </Text>
                <AntDesign
                  name="google"
                  size={iconSize}
                  color="white"
                  style={styles.iconStyle}
                />
              </View>
            </TouchableOpacity>
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
  }
}

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
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: wsize(293),
    height: hsize(56),
    backgroundColor: '#FCF9FC',
    // marginTop: hsize(13),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DADBDA',
    justifyContent: 'flex-start',
    backgroundColor: '#FCF9FC',
    borderColor: '#DADBDA',
    borderWidth: 1,
    borderRadius: 6,
  },
  googleButtonText: {
    fontSize: wsize(15),
    // lineHeight: wsize(18),
    letterSpacing: 0.6,
    color: '#313131',
  },
});
``;
