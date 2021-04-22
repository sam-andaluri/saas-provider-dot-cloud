import './App.css';
import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

import SignUp from "./components/SignUp";
import Loading from "./components/loading";
import Profile from "./components/profile";
import ProtectedRoute from "./components/protected-route";

function App() {

  const { isLoading } = useAuth0();
  if (isLoading) {
      return <Loading />;
  }

  return (
    <div className="App">
    <NavBar/>
    <div className="content">
        <Switch>
            {/*<ProtectedRoute*/}
            {/*    path="/signup"*/}
            {/*    render={props => <SignUp tier="free" {...props} />}*/}
            {/*/>*/}
            <ProtectedRoute path="/signup" component={SignUp} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route path="/" exact component={Pricing} />
        </Switch>
    </div>
    <Footer/>
    </div>
  );
}

export default App;
