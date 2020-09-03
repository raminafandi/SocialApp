import React, { useState, useEffect } from 'react';
import { YellowBox, Alert } from 'react-native';
import firebase from '../firebase/index';
import { createUser, loginUser, logoutUser } from '../api/user'
const AuthContext = React.createContext({
  authenticated: false,
  login: () => { },
  register: () => { },
  logout: () => { },
  user: null,
  loading: false,
});

const AuthProvider = ({ children, ...props }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    YellowBox.ignoreWarnings(['Setting a timer']);
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    user ? setAuthenticated(true) : setAuthenticated(false);
    setLoading(false);
  };

  const registerHandler = (email, password, userName, fullName) => {
    setLoading(true);
    createUser(email, password, userName, fullName).catch(() => setLoading(false));
  };
  const loginHandler = (email, password) => {
    setLoading(true);
    loginUser(email, password).catch(() => setLoading(false));
  };
  const logoutHandler = () => {
    setLoading(true);
    logoutUser();
    
  };
  return (
    <AuthContext.Provider
      value={{
        login: loginHandler,
        register: registerHandler,
        logout: logoutHandler,
        authenticated: authenticated,
        user: user,
        loading: loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
