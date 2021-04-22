import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useLocation} from "react-router-dom";

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;
  const url = new URLSearchParams(useLocation().search).get("url")
  return (
    <div>
      <div className="row align-items-left profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div className="col-md text-left text-md-left">
          <h2>{name}</h2>
          <p className="lead text-muted">{email}</p>
        </div>
        <div className="col-md text-left text-md-left">

          <a href={'https://' + url}>Your application is ready!! Welcome to Tiddler Analytics</a>
        </div>
      </div>
      {/*<div className="row">*/}
      {/*  <pre className="col-12 text-light bg-dark p-4">*/}
      {/*    {JSON.stringify(user, null, 2)}*/}
      {/*  </pre>*/}
      {/*</div>*/}
    </div>
  );
};

export default Profile;


