import './App.css';
import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./old-components/loading";
import Home from "./old-components/home";
import Profile from "./old-components/profile";
import ProtectedRoute from "./old-components/protected-route";
function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="App">
      <Switch>
        <ProtectedRoute path="/profile" component={Profile} />
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;
