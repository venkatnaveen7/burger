import React, { Component } from "react";
import cssClasses from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" }
];

const BuildControls = props => {
  return (
    <div className={cssClasses.BuildControls}>
      <p>
        Total Price : <strong>{props.totalPrice.toFixed(2)} INR</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          addIngredient={() => props.addIngredient(ctrl.type)}
          removeIngredient={() => props.removeIngredient(ctrl.type)}
          disabled={props.disabledInfo[ctrl.type]}
        ></BuildControl>
      ))}
      <button className={cssClasses.OrderButton} disabled={!props.purchasable}>
        Order Now !
      </button>
    </div>
  );
};

export default BuildControls;
