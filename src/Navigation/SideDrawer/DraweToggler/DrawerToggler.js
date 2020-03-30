import React, { Component } from "react";
import classes from "./DrawToggler.module.css";

const DrawerToggler = props => (
  <div onClick={props.openSlideHandler} className={classes.DrawerToggle}>
    <div />
    <div />
    <div></div>
  </div>
);

export default DrawerToggler;
