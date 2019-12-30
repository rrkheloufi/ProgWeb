import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as TheMealDb from "../TheMealDB/TheMealDB";

class Meal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meal: null
        };
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        let meal = await TheMealDb.getMealById(params.mealId);
        this.setState({
            meal
        });
    }

    render() {
        const { meal } = this.state;
        if (meal === null) return (
            <div className="spinners">
                <div className="spinner-grow text-primary" role="status" />
                <div className="spinner-grow text-primary" role="status" />
                <div className="spinner-grow text-primary" role="status" />
            </div>);
        return (
            <div className="container">
                <h1 className="my-4">{meal.strMeal}
                </h1>
                <div className="row">
                    <div class="card mb-3 meal-info">
                        <div class="row no-gutters">
                            <div class="col-md-3">
                                <img src={meal.strMealThumb} class="card-img" alt="..." />
                            </div>
                            <div class="col-md-9">
                                <div class="card-body">
                                    <table class="table">
                                        <tbody>
                                            <tr>                                                <th scope="row">Category</th>
                                                <td>{meal.strCategory}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Area</th>
                                                <td>{meal.strArea}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Youtube</th>
                                                <td><a href={meal.strYoutube} target="_blank">{meal.strYoutube}</a></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Source</th>
                                                <td><a href={meal.strSource} target="_blank">{meal.strSource}</a></td>
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
                    {this.state.meal.ingredients.map(ingredient => (
                        <div className="col-md-2 col-sm-4 mb-4">
                            <div className="card ingredient">
                                <div className="card-header">{ingredient.ingredient}</div>
                                <div className="card-body">
                                    <a href="#">
                                        <img className="img-fluid" src={"https://www.themealdb.com/images/ingredients/" + ingredient.ingredient + ".png"} alt="" />
                                    </a>
                                </div>
                                <div className="card-footer">{ingredient.quantity}</div>
                            </div>
                        </div>))
                    }
                </div>
                <h3 className="my-3">Instructions</h3>
                <div className="row instructions">
                    <ul>
                        {meal.strInstructions.split('\n').map((item, i) => {
                            if (item !== "\r")
                                return <li key={i}>{item}</li>;
                        })}
                    </ul>
                </div>


            </div >
        )

    }
}

export default Meal;
