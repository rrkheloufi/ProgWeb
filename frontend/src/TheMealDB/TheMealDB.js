import axios from "axios";

export async function getRandomMeals(numberOfMeals) {
  let meals = [];
  let ids = [];
  for (var i = 0; i < numberOfMeals; i++) {
    let meal = (
      await axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
    ).data["meals"][0];
    let mealId = meal.idMeal;
    //To prevent two same meals.
    //TODO : Don't do that, this can turn into an infinity loop if all meals id are in the ids array.
    while (ids.includes(mealId)) {
      meal = (
        await axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
      ).data["meals"][0];
      mealId = meal.idMeal;
    }
    ids.push(mealId);
    meals.push(meal);
  }
  return meals;
}

export async function getMealById(mealId) {
  let meal = (await axios.get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId)).data["meals"][0];

  let ingredientsArr = [];
  for (let index = 1; index <= 20; index++) {
    let ingredientProp = "strIngredient" + index;
    let quantityProp = "strMeasure" + index;
    let name = meal[ingredientProp];
    let quantity = meal[quantityProp];
    if (name !== "") {
      let ingredientObj = {
        ingredient: name,
        quantity: quantity
      };
      ingredientsArr.push(ingredientObj);
    }
  }

  return {
    strMeal: meal.strMeal,
    strInstructions: meal.strInstructions,
    strMealThumb: meal.strMealThumb,
    strTags: meal.strTags,
    strYoutube: meal.strYoutube,
    strCategory: meal.strCategory,
    strArea: meal.strArea,
    strSource: meal.strSource,
    ingredients: ingredientsArr
  };
}
