import React, {useState, useEffect, useContext} from 'react';

const AuthContext = React.createContext("");

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props){
    const [authUser, setAuthUser] = useState(null);
    const [signedIn, setSignedIn] = useState(false);
    const [isAdmin,  setIsAdmin]  = useState(false);

    const authContextValue = {
        authUser,
        setAuthUser,
        signedIn,
        setSignedIn,
        isAdmin,
        setIsAdmin
    };

    return(
        <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>
    )
};