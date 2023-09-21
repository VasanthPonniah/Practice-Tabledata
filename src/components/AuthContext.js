import React from "react";
import { useEffect, useState } from "react";

export const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: () => { },
    onLogout: () => { }
});

export const AuthContextProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedInfo = localStorage.getItem("loggedIn")
        if (storedInfo === "1")
            setIsLoggedIn(true);
    }, [])

    const loginHandler = (email, password) => {
        localStorage.setItem("loggedIn", '1')
        setIsLoggedIn(true)
    }

    const logoutHandler = () => {
        localStorage.clear();
        setIsLoggedIn(false)
    }
    return (
        <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogin: loginHandler, onLogout: logoutHandler }}>{props.children}</AuthContext.Provider>
    )
}