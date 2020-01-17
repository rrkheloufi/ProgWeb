import React, { Component } from "react";
import * as TheMealDb from "../TheMealDB/TheMealDB";
import { AddInBoxModal } from "../Meal/displayMealUtils";
import axios from "axios";
import auth0Client from "../Auth";

class Meal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: null,
      boxes: null
    };
  }

  async componentDidMount() {
    const {
      match: { params }
    } = this.props;
    let meal = await TheMealDb.getMealById(params.mealId);
    let boxes = [];
    if (auth0Client.isAuthenticated()) {
      let userEmail = auth0Client.getProfile().email;

      boxes = (
        await axios.get(`http://localhost:8081/boxes`, {
          params: {
            ownerEmail: userEmail //TODO : pass here the email of the user
          }
        })
      ).data;
    }
    this.setState({
      meal,
      boxes
    });
  }

  render() {
    const { meal, boxes } = this.state;
    if (meal === null)
      return (
        <div className="spinners">
          <div className="spinner-grow text-primary" role="status" />
          <div className="spinner-grow text-primary" role="status" />
          <div className="spinner-grow text-primary" role="status" />
        </div>
      );
    return (
      <div className="container showAddBoxButton">
        <h1 className="my-4">{meal.strMeal}</h1>

        <div className="row">
          <div className="card mb-3 meal-info">
            <div className="row no-gutters">
              <div className="col-md-3">
                <img src={meal.strMealThumb} className="card-img" alt="..." />
              </div>
              <div className="col-md-9">
                {auth0Client.isAuthenticated() && (
                  <AddInBoxModal
                    boxes={boxes}
                    mealId={meal.idMeal}
                    displayBoxPageThumbnail={false}
                    box={null}
                  />
                )}
                <div className="card-body">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row">Category</th>
                        <td>{meal.strCategory}</td>
                      </tr>
                      <tr>
                        <th scope="row">Area</th>
                        <td>{meal.strArea}</td>
                      </tr>
                      <tr>
                        <th scope="row">Youtube</th>
                        <td>
                          <a href={meal.strYoutube} target="_blank">
                            {meal.strYoutube}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Source</th>
                        <td>
                          <a href={meal.strSource} target="_blank">
                            {meal.strSource}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Tags</th>
                        <td>{meal.strTags}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="my-4">Ingredients</h3>
        <div className="row">
          {this.state.meal.ingredients.map(
            ingredient =>
              ingredient.ingredient && (
                <div
                  key={ingredient.ingredient}
                  className="col-md-2 col-sm-4 mb-4"
                >
                  <div className="card ingredient">
                    <div className="card-header">{ingredient.ingredient}</div>
                    <div className="card-body">
                      <a href="#">
                        <img
                          className="img-fluid"
                          src={
                            "https://www.themealdb.com/images/ingredients/" +
                            ingredient.ingredient +
                            ".png"
                          }
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="card-footer">{ingredient.quantity}</div>
                  </div>
                </div>
              )
          )}
        </div>
        <h3 className="my-3">Instructions</h3>
        <div className="row instructions">
          <ul>
            {meal.strInstructions.split("\n").map((item, i) => {
              if (item !== "\r") return <li key={i}>{item}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Meal;
