import React, { Component } from "react";
import NavBar from "./NavBar/NavBar";
import Callback from "./Callback";
import { Route } from "react-router-dom";

// Use Route for routes accessible to everyone.
// Use SecuredRoute for routes accessible only to logged users.
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/callback" component={Callback} />
      </div>
    );
  }
}

export default App;
