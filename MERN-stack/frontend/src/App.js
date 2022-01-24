import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import UserPlaces from "./places/pages/UserPlaces";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UpdatePlace from "./places/pages/UpdatePlace";
import Authenticate from "./user/pages/Authenticate";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {

  // this holds the current state to determine if user is logged in or not. Starts off as false
  const [ token, setToken ] = useState(false)
  const [ userID, setUserID ] = useState(null)

  const login = useCallback((userID, token) => {
    setToken(token)
    setUserID(userID)
    localStorage.setItem("userData", JSON.stringify({userID: userID, token: token}))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserID(null)
    localStorage.removeItem("userData")
  }, [])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"))
  
    if (storedData && storedData.token) {
      login(storedData.userID, storedData.token)
    }
  }, [login])

  let routes

  if (token) {
    routes = (
      <Switch>
        {/* users route */}
        <Route path="/" exact>
          <Users />
        </Route>
        
        {/* UserPlaces route */}
        <Route path="/:userId/places">
          <UserPlaces />
        </Route>

        {/* NewPlace route */}
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>

        {/* Update Place Route */}
        <Route path='/places/:placeId'>
          <UpdatePlace />
        </Route>

        {/* redirects if none of the routes are matched */}
        <Redirect to="/" />

      </Switch>
    )
  } else {
    routes = (
      <Switch>

        {/* users route */}
        <Route path="/" exact>
          <Users />
        </Route>
        
        {/* UserPlaces route */}
        <Route path="/:userId/places">
          <UserPlaces />
        </Route>

        {/* LOGIN/REGISTER */}
        <Route path="/auth" exact>
          <Authenticate />
        </Route>

        {/* redirects if none of the routes are matched */}
        <Redirect to="/auth" />

      </Switch>
    )
  }

  return (
    <AuthContext.Provider value = {{
      isLoggedIn: !!token,
      token: token,
      userID: userID,
      login: login,
      logout: logout
    }}>

      <Router>
        <MainNavigation />
        <main>
          <Switch>

            { routes }

          </Switch>
        </main>
      </Router>

    </AuthContext.Provider>
  );
}

export default App;
