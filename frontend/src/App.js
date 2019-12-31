import React, { Component } from "react";
import NavBar from "./NavBar/NavBar";
import Meals from "./Meals/Meals";
import Meal from "./Meal/Meal";
import SearchBar from "./Search/Search";
import Callback from "./Callback";
import { Route } from "react-router-dom";

// Use Route for routes accessible to everyone.
// Use SecuredRoute for routes accessible only to logged users.
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path='/' component={SearchBar}/>
        <Route exact path="/callback" component={Callback} />
        <Route exact path='/meal/:mealId' component={Meal}/>
      </div>
    );
  }
}

export default App;
