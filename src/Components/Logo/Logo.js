import React, { Component } from "react";
import bugerImg from "../../Asserts/Images/burger-logo.png";
import classes from "./Logo.module.css";

const Logo = props => (
  <div className={classes.Logo}>
    <img src={bugerImg} alt="Burger Image"></img>
  </div>
);

export default Logo;
