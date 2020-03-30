import React, { Component } from "react";
import buttonCss from "./Button.module.css";

const Button = props => (
  <button
    onClick={props.clicked}
    className={[buttonCss.Button, buttonCss[props.btnType]].join(" ")}
  >
    {props.children}
  </button>
);

export default Button;
