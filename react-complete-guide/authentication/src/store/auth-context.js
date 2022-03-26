import React, { useState, useEffect, useCallback } from "react";

let logoutTimer

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
})

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime()
    
    const adjustedExpirationTime = new Date(expirationTime).getTime()

    const remainingDuration = adjustedExpirationTime - currentTime

    return remainingDuration
}

const retreiveStoredToken = () => {
    const storedToken = localStorage.getItem('token')
    const storedExpirationDate = localStorage.getItem('expirationTime')

    const remainingTime = calculateRemainingTime(storedExpirationDate)

    if (remainingTime <= 60000) {
        localStorage.clear()

        return null
    }

    return { token: storedToken, duration: remainingTime }
}

export const AuthContextProvider = (props) => {

    let initialToken

    const tokenData = retreiveStoredToken()
    if (tokenData) {
        initialToken = tokenData.token
    }

    const [ token, setToken ] = useState(initialToken)

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null)
        localStorage.clear()

        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }, [])
    
    const loginHandler = (token, expirationTime) => {
        setToken(token)
        localStorage.setItem('token', token)
        localStorage.setItem('expirationTime', expirationTime)

        const remainingTime = calculateRemainingTime(expirationTime)

        logoutTimer = setTimeout(logoutHandler, remainingTime)
    }

    useEffect(() => {
        if (tokenData) {
            console.log(tokenData.duration)
            logoutTimer = setTimeout(logoutHandler, tokenData.duration)
        }
    }, [ tokenData, logoutHandler ])

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value = { contextValue }>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthContext