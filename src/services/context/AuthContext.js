import React, { useState, useEffect } from 'react';
import { YellowBox, Alert, LogBox } from 'react-native';
import firebase from '../firebase/index';
import { createUser, loginUser, logoutUser, getUserInfo } from '../api/user';
import * as Facebook from 'expo-facebook';
import { facebookSignIn } from '../api/user';
const AuthContext = React.createContext({
  authenticated: false,
  login: () => { },
  facebookLogin: () => { },
  register: () => { },
  logout: () => { },
  user: null,
  userExtraInfo: null,
  loading: false,
});

const AuthProvider = ({ children, ...props }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userExtraInfo, setUserExtraInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    YellowBox.ignoreWarnings(['Setting a timer']);
    console.disableYellowBox = true;
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    // Facebook.initializeAsync('326392205351093')
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user) getUserInfo().then((doc) => setUserExtraInfo(doc.data()));
  }, [user]);
  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    user ? setAuthenticated(true) : setAuthenticated(false);
    setLoading(false);
  };

  const registerHandler = (email, password, userName, fullName) => {
    setLoading(true);
    createUser(email, password, userName, fullName).catch(() =>
      setLoading(false)
    );
  };
  const loginHandler = (email, password) => {
    setLoading(true);
    loginUser(email, password).finally(() => setLoading(false));
  };

  const logoutHandler = () => {
    setLoading(true);
    logoutUser();
  };
  return (
    <AuthContext.Provider
      value={{
        login: loginHandler,
        facebookLogin: facebookSignIn,
        register: registerHandler,
        logout: logoutHandler,
        authenticated: authenticated,
        user: user,
        userExtraInfo: userExtraInfo,
        loading: loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
