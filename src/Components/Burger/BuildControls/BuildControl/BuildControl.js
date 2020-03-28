import React, { Component, useRef, useEffect } from "react";
import cssClasses from "./BuildControl.module.css";

const BuildControl = props => {
  return (
    <div className={cssClasses.BuildControl}>
      <label className={cssClasses.Label}>{props.label}</label>
      <button
        className={cssClasses.Less}
        onClick={props.removeIngredient}
        disabled={props.disabled}
      >
        Less
      </button>
      <button className={cssClasses.More} onClick={props.addIngredient}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
