import React, { useState } from 'react';


const AuthContext = React.createContext({
    auhtenticated: false,
    login: () => { },
})

const AuthProvider = ({ children, ...props }) => {
    const [auth, setAuth] = useState(false);

    const loginHandler = () => {
        setAuth(true);
    }
    return (
        <AuthContext.Provider value={{
            login: loginHandler,
            auhtenticated: auth,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };