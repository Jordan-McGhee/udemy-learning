import { useState, useEffect, useCallback } from "react"


let logoutTimer

export const useAuth = () => {
    // this holds the current state to determine if user is logged in or not. Starts off as false
    const [ token, setToken ] = useState(false)
    const [ tokenExpirationDate, setTokenExpirationDate ] = useState()
    const [ userID, setUserID ] = useState()

    const login = useCallback((userID, token, expirationDate) => {
    setToken(token)
    setUserID(userID)
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationDate(tokenExpirationDate)

    localStorage.setItem(
            "userData",
            JSON.stringify({
            userID: userID,
            token: token,
            expiration: tokenExpirationDate.toISOString()
            })
        )
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setTokenExpirationDate(null)
        setUserID(null)
        localStorage.removeItem("userData")
    }, [])

    useEffect(() => {
        if(token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
            logoutTimer = setTimeout(logout, remainingTime)
        } else {
            clearTimeout(logoutTimer)
        }

    }, [token, logout, tokenExpirationDate])

    useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"))

    if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
    ) {
        login(storedData.userID, storedData.token, new Date(storedData.expiration))
        }
    }, [login])


    return { token, login, logout, userID }
}