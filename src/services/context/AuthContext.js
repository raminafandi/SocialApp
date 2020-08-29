import React, { useState, useEffect } from 'react';
import firebase from '../firebase/index';
import { auth } from 'firebase';
import { Alert } from 'react-native';

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
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    user ? setAuhtenticated(true) : setAuhtenticated(false);
    setLoading(false);
  };

  const registerHandler = (email, password) => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert(
            'Wrong Credentials',
            'That email address is already in use!'
          );
          setLoading(false);
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Wrong Credentials', 'That email address is invalid!');
          setLoading(false);
          console.log();
        }
      });
  };
  const loginHandler = (email, password) => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        Alert.alert('Wrong Credentials', err.message);
        setLoading(false);
        // console.error(err);
      });
  };
  const logoutHandler = () => {
    setLoading(true);
    auth()
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
