import React, { Component } from "react";
import { Link } from "react-router-dom";

export function displayMealThumbnail(meal) {
  return (
    <div key={meal.idMeal} className="col-sm-12 col-md-4 col-lg-3">
      <Link to={`/meal/${meal.idMeal}`}>
        <div className="card meal w-100">
          <img src={meal.strMealThumb} className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-title">{meal.strMeal}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function displayMealsThumbnail(meals) {
  console.log(meals);
  return meals.map(meal => {
    return this.displayMealThumbnail(meal);
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
