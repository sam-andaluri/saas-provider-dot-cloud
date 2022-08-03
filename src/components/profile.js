import React from "react";
import {useLocation} from "react-router-dom";

const Profile = () => {
  const url = new URLSearchParams(useLocation().search).get("url")
  return (
    <div>
      <div className="row align-items-left profile-header">
        <div className="col-md-2 mb-3">
        </div>
        <div className="col-md text-left text-md-left">

          <a href={'https://' + url}>Your application is ready!! Welcome to Tiddler Analytics</a>
        </div>
      </div>
    </div>
  );
};

export default Profile;


