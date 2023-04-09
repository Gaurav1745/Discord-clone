import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="login__logo">
          <img
            src="https://seeklogo.com/images/D/discord-logo-134E148657-seeklogo.com.png"
            alt="Logo"
          />
        </div>
        <Button onClick={signIn}>Sign In</Button>
      </div>
    </div>
  );
}

export default Login;
