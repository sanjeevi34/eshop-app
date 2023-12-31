import React, {useState, useEffect, useContext} from 'react';

const AuthContext = React.createContext("");

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props){

    // States which are needed to be tracked by context
    const [authUser, setAuthUser]       = useState(null);
    const [signedIn, setSignedIn]       = useState(false);
    const [isAdmin,  setIsAdmin]        = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const authContextValue = {
        authUser,
        setAuthUser,
        signedIn,
        setSignedIn,
        isAdmin,
        setIsAdmin,
        orderPlaced,
        setOrderPlaced,
    };

    return(
        <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>
    )
};