import React, { Component } from "react";
import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";
import cssClasses from "./Burger.module.css";

const Burger = props => {
  console.log("props.ingredients", props.ingredients);
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingKey => {
      console.log("ing Key", ingKey);
      return [...Array(props.ingredients[ingKey])].map((j, k) => {
        return (
          <BurgerIngredient key={ingKey + k} type={ingKey}></BurgerIngredient>
        );
      });
    })
    .reduce((arr, el) => arr.concat(el), []);
  if (transformedIngredients.length == 0)
    transformedIngredients = "Pease Add Ingredeients";
  return (
    <div className={cssClasses.Burger}>
      <BurgerIngredient type="top-bread"></BurgerIngredient>
      {transformedIngredients}
      <BurgerIngredient type="bottom-bread"></BurgerIngredient>
    </div>
  );
};

export default Burger;
