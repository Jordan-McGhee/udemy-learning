import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>

          {/* users route */}
          <Route path="/" exact>
            <Users />
          </Route>

          {/* NewPlace route */}
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>

          {/* redirects if none of the routes are matched */}
          <Redirect to="/" />

        </Switch>
      </main>
    </Router>
  );
}

export default App;
