import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

// import UserPlaces from "./places/pages/UserPlaces";
// import Users from "./user/pages/Users";
// import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import Authenticate from "./user/pages/Authenticate";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const Users = React.lazy(() => import("./user/pages/Users"))
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"))
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"))
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"))
const Authenticate = React.lazy(() => import("./user/pages/Authenticate"))

const App = () => {

  const { token, login, logout, userID } = useAuth()

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

            <Suspense fallback = {<div className="center"><LoadingSpinner /></div>}>

              { routes }

            </Suspense>

          </Switch>
        </main>
      </Router>

    </AuthContext.Provider>
  );
}

export default App;
