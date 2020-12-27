import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button color="inherit"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
