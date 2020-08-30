import React, { useState, useEffect } from 'react';
import { YellowBox, Alert } from 'react-native';
import firebase from '../firebase/index';
const AuthContext = React.createContext({
  auhtenticated: false,
  login: () => {},
  register: () => {},
  logout: () => {},
  user: null,
  loading: false,
});

const AuthProvider = ({ children, ...props }) => {
  const [auhtenticated, setAuhtenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();
  useEffect(() => {
    YellowBox.ignoreWarnings(['Setting a timer']);
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    user ? setAuhtenticated(true) : setAuhtenticated(false);
    setLoading(false);
  };

  const registerHandler = (email, password, userName, fullName) => {
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.updateProfile({
          displayName: userName,
          photoURL:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        });
        db.collection('users')
          .doc(user.uid)
          .set({
            fullName: fullName,
            status: '',
            city: '',
            link: '',
            additionalInfo: '',
            friends: 0,
            subs: 0,
            saved: {
              items: [],
              items_snip: {},
              packs: [],
              packs_snip: {},
            },
          });
        // console.log('cred', user)
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert(
            'Wrong Credentials',
            'That email address is already in use!'
          );
          setLoading(false);
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Wrong Credentials', 'That email address is invalid!');
          setLoading(false);
        } else {
          Alert.alert('Wrong Credentials', error);
          setLoading(false);
        }
      });
  };
  const loginHandler = (email, password) => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((cred) => console.log('display-name', cred.user.displayName))
      .catch((err) => {
        Alert.alert('Wrong Credentials', 'Login Credentials are not valid');
        setLoading(false);
      });
  };
  const logoutHandler = () => {
    setLoading(true);
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      });
  };
  return (
    <AuthContext.Provider
      value={{
        login: loginHandler,
        register: registerHandler,
        logout: logoutHandler,
        auhtenticated: auhtenticated,
        user: user,
        loading: loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
