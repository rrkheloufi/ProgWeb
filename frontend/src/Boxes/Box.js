import React, { Component } from "react";
import axios from "axios";
import * as TheMealDb from "../TheMealDB/TheMealDB";
import * as DisplayMealUtils from "../Meal/displayMealUtils";

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      box: null,
      meals: null
    };
  }

  async componentDidMount() {
    const {
      match: { params }
    } = this.props;
    const box = (await axios.get(`http://localhost:8081/box/${params.id}`))
      .data;
    console.log(box);
    const meals = await TheMealDb.getMealsByIds(box.mealsIds);
    this.setState({
      box,
      meals
    });
  }

  render() {
    const { box, meals } = this.state;
    if (box === null) return DisplayMealUtils.displayLoadingDots();
    return (
      <div className="container">
        <div className="jumbotron boxJumbotron col-12">
          <h1 className="my-2">{box.name}</h1>
          <p className="lead">{box.description}</p>
          <hr className="my-4" />
          <div className="container">
            <div className="row">
              {meals === null && DisplayMealUtils.displayLoadingDots()}
              {meals &&
                DisplayMealUtils.displayMealsThumbnail(meals, null, true, box)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Box;
