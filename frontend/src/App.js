import React, { Component } from "react";
import NavBar from "./NavBar/NavBar";
import Meal from "./Meal/Meal";
import SearchBar from "./Search/Search";
import Callback from "./Callback";
import { Route } from "react-router-dom";
import Boxes from "./Boxes/Boxes";
import Box from "./Boxes/Box";
import CreateBox from "./Boxes/CreateBox";
import UpdateBox from "./Boxes/UpdateBox";

// Use Route for routes accessible to everyone.
// Use SecuredRoute for routes accessible only to logged users.
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/" component={SearchBar} />
        <Route exact path="/callback" component={Callback} />
        <Route exact path="/boxes" component={Boxes} />
        <Route exact path="/box/:id" component={Box} />
        <Route exact path="/boxes/create" component={CreateBox} />
        <Route exact path="/boxes/update/:boxId" component={UpdateBox} />
        <Route exact path="/meal/:mealId" component={Meal} />
      </div>
    );
  }
}

export default App;
