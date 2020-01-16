import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

import * as TheMealDb from "../TheMealDB/TheMealDB";
import * as DisplayMealUtils from "../Meal/displayMealUtils";

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      box: null,
      meals: null,
      disabled: false,
      id: null
    };
  }

  async componentDidMount() {
    const {
      match: { params }
    } = this.props;
    const box = (await axios.get(`http://localhost:8081/box/${params.id}`))
      .data;
    const id = params.id
    console.log(box);
    const meals = await TheMealDb.getMealsByIds(box.mealsIds);
    this.setState({
      box,
      meals,
      id
    });
  }

  async submit() {
    this.setState({
      disabled: true
    });

    await axios.post(
      "http://localhost:8081/box",
      {
        name: this.state.boxName,
        ownerEmail: this.state.ownerEmail,
        mealsIds: [],
        description: this.state.description
      } /*,
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }*/
    );

    this.props.history.push("/boxes");
  }

  render() {
    const { box, meals } = this.state;
    if (box === null) return DisplayMealUtils.displayLoadingDots();
    return (
      <div className="container">
        <div className="jumbotron boxJumbotron col-12">
          <h1 className="my-2">{box.name}
          <Link to={`/boxes/update/${box._id}`}>
            <button className="btn btn-danger btn-circle btn-xl">
                <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
            </Link>
          </h1>
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
