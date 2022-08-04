import React from 'react';
import { useHistory } from 'react-router-dom';
import Auth from './Auth';

function AuthLogOutButton() {
    let history = useHistory();
  
    return Auth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            Auth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    );
}

export default AuthLogOutButton;