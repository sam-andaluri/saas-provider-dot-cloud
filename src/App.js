import './App.css';
import React from "react";

import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

import SignUp from "./components/SignUp";
import Profile from "./components/profile";

function App() {

  return (
    <div className="App">
    <NavBar/>
    <div className="content">
        <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/profile" component={Profile} />
            <Route path="/" exact component={Pricing} />
        </Switch>
    </div>
    <Footer/>
    </div>
  );
}

export default App;
