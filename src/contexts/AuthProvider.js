import React, { Children } from 'react';
import { createContext } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../Pages/Login/firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const authInfo = {

}
const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;