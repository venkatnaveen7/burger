import React, { Component } from "react";
import customCssClasses from "./Input.module.css";

const MyCustomInput = props => {
  let inputElement;
  const cssClasses = [customCssClasses.InputElement];
  if (props.invalid && props.validations && props.touched) {
    cssClasses.push(customCssClasses.Invalid);
  }

  switch (props.elementType) {
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          className={cssClasses.join(" ")}
          {...props.elementConfig}
        ></textarea>
      );
      break;
    case "password":
      inputElement = (
        <input onChange={props.changed} type="password" {...props}></input>
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
          className={cssClasses.join(" ")}
        >
          {props.elementConfig.options.map(obj => (
            <option key={obj.value} value={obj.value}>
              {obj.type}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.changed}
          className={cssClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        ></input>
      );
  }

  return (
    <div className={customCssClasses.Input}>
      <label className={customCssClasses.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default MyCustomInput;
