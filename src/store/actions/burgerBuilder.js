import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = ingredient => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingredient
  };
};

export const removeIngredient = ingredient => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredient
  };
};

const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

const failedToLoadIngredients = error => {
  return {
    type: actionTypes.FAILED_TO_LOAD_INGREDIENTS,
    error: error
  };
};

export const loadIngredients = token => {
  return dispatch => {
    axios
      .get("ingredients.json")
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(failedToLoadIngredients(error));
      });
  };
};
