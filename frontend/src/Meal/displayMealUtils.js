import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import * as BoxDB from "../Boxes/boxDbUtils";

export function displayMealThumbnail(
  meal,
  boxes,
  displayBoxPageThumbnail,
  box
) {
  return (
    <div key={meal.idMeal} className="col-sm-12 col-md-4 col-lg-3">
      <div id={meal.idMeal} className="card meal w-100">
        <AddInBoxModal
          boxes={boxes}
          mealId={parseInt(meal.idMeal)}
          displayBoxPageThumbnail={displayBoxPageThumbnail}
          box={box}
        />
        <Link to={`/meal/${meal.idMeal}`}>
          <img src={meal.strMealThumb} className="card-img-top" alt="..." />
        </Link>
        <div className="card-body">
          <p className="card-title">{meal.strMeal}</p>
        </div>
      </div>
    </div>
  );
}

export function displayMealsThumbnail(
  meals,
  boxes,
  displayBoxPageThumbnail,
  box
) {
  return meals.map(meal => {
    return this.displayMealThumbnail(meal, boxes, displayBoxPageThumbnail, box);
  });
}

export function displayLoadingDots() {
  return (
    <div className="spinners">
      <div className="spinner-grow text-primary" role="status" />
      <div className="spinner-grow text-primary" role="status" />
      <div className="spinner-grow text-primary" role="status" />
    </div>
  );
}

function AddInBoxModal(props) {
  const [smShow, setSmShow] = useState(false);
  return (
    <ButtonToolbar>
      <Button
        type="button"
        onClick={() => {
          if (props.displayBoxPageThumbnail === true) {
            BoxDB.removeMealFromBox(props.box, props.mealId);
            document.getElementById(props.mealId).remove();
          } else {
            setSmShow(true);
          }
        }}
        className="btn btn-danger btn-circle btn-xl addInBoxButton"
      >
        {props.displayBoxPageThumbnail === true && (
          <i className="fa fa-trash" aria-hidden="true"></i>
        )}
        {props.displayBoxPageThumbnail === false && (
          <i className="fa fa-plus" aria-hidden="true"></i>
        )}
      </Button>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Boxes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            {props.boxes &&
              props.boxes.map(box => boxListItem(box, props.mealId))}
          </ul>
        </Modal.Body>
      </Modal>
    </ButtonToolbar>
  );
}

function boxListItem(box, mealId) {
  if (box.mealsIds.includes(mealId)) {
    return (
      <button
        key={box._id}
        type="button"
        className="btn btn-success btn-block"
        id={box._id + mealId}
        onClick={() => {
          refreshButton(box._id + mealId, false, box, mealId);
        }}
      >
        <i className="fa fa-check" aria-hidden="true"></i>
        {" " + box.name}
      </button>
    );
  } else {
    return (
      <button
        key={box._id}
        type="button"
        id={box._id + mealId}
        className="btn btn-outline-secondary btn-block"
        onClick={() => {
          refreshButton(box._id + mealId, true, box, mealId);
        }}
      >
        {box.name}
      </button>
    );
  }
}

async function refreshButton(buttonId, addMeal, box, mealId) {
  let button = document.getElementById(buttonId);
  if (addMeal) {
    BoxDB.addMealToBox(box, mealId);
    button.className = "btn btn-success btn-block";
  } else {
    BoxDB.removeMealFromBox(box, mealId);
    button.className = "btn btn-outline-secondary btn-block";
  }
}
