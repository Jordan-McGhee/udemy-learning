import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";

const App = () => {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
