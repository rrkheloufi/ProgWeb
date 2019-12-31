import React from "react";
import { Link, withRouter } from "react-router-dom";
import auth0Client from "../Auth";

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace("/");
  };

  return (
    <nav className="navbar fixed-top">
      <Link className="navbar-brand" to="/">
        PinMeal
      </Link>
      {!auth0Client.isAuthenticated() && (
        <div>
          <Link className="btn btn-info boxesButton" to="/boxes">
            Boxes
          </Link>
          <button className="btn btn-light" onClick={auth0Client.signIn}>
            Sign In
          </button>
        </div>
      )}
      {auth0Client.isAuthenticated() && (
        <div>
          <label className="mr-2 text-white">
            {auth0Client.getProfile().name}
          </label>
          <button
            className="btn btn-dark"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}

export default withRouter(NavBar);
