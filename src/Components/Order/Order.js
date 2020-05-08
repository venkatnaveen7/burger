import classes from "./Order.module.css";
import React, { Component } from "react";
const Order = props => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingOP = ingredients.map(obj => {
    return (
      <span
        style={{
          border: "1px solid green",
          margin: "1px 2px ",
          textTransform: "uppercase",
          padding: "10px",
          boxSizing: "border-box",
          width: "80%",
          boxShadow: "0 2px 3px #ccc"
        }}
      >
        {obj.name} ({obj.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      {ingOP}
      <span
        style={{
          border: "1px solid green",
          margin: "1px 2px ",
          textTransform: "uppercase",
          padding: "10px"
        }}
      >
        {" "}
        Price:<strong> {props.price} INR</strong>
      </span>
    </div>
  );
};

export default Order;
