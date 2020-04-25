import React, { Component } from "react";
import cssClasses from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";
const NavigationItem = props => (
  <li className={cssClasses.NavigationItem}>
    <NavLink to={props.link} exact activeClassName={cssClasses.active}>
      {props.children}
    </NavLink>
  </li>
);
export default NavigationItem;
