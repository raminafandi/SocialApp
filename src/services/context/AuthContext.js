import React, { useState, useEffect } from 'react';
import firebase from '../firebase/index'
import { auth } from 'firebase';

const AuthContext = React.createContext({
    auhtenticated: false,
    login: () => { },
    register: () => { },
    logout: () => { },
    user: null,
    loading: false,
})

const AuthProvider = ({ children, ...props }) => {
    const [auhtenticated, setAuhtenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Handle user state changes
    const onAuthStateChanged = user => {
        setUser(user);
        user ? setAuhtenticated(true) : setAuhtenticated(false);
        setLoading(false);
    }

    const registerHandler = (email, password) => {
        setLoading(true);
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }
    const loginHandler = (email, password) => {
        setLoading(true);
        auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                console.error(err);
            })
    }
    const logoutHandler = () => {
        setLoading(true);
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!')
            });
    }
    return (
        <AuthContext.Provider value={{
            login: loginHandler,
            register: registerHandler,
            logout: logoutHandler,
            auhtenticated: auhtenticated,
            user: user,
            loading: loading,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };