import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as TheMealDb from "../TheMealDB/TheMealDB";

import SearchBar from "../SearchBar/SearchBar";

class Meals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meals: null
    };
  }

  async componentDidMount() {
    let meals = await TheMealDb.getRandomMeals(16);

    this.setState({
      meals
    });
  }

  render() {
    return (
      <div className="container">
        <SearchBar/>
        <div className="row">
          {this.state.meals === null && (
            <div className="spinners">
              <div className="spinner-grow text-primary" role="status" />
              <div className="spinner-grow text-primary" role="status" />
              <div className="spinner-grow text-primary" role="status" />
            </div>
          )}
          {this.state.meals &&
            this.state.meals.map(meal => (
              <div key={meal.idMeal} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/meal/${meal.idMeal}`}>
                  <div className="card meal">
                    <img
                      src={meal.strMealThumb}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <p className="card-title">{meal.strMeal}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Meals;
