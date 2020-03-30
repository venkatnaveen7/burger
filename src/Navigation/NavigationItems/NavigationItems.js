import React, { Component } from "react";
import cssClasses from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = props => (
  <ul className={cssClasses.NavigationItems}>
    <NavigationItem link="/" active>
      Burger Buiilder
    </NavigationItem>
    <NavigationItem link="/">CheckOut</NavigationItem>
  </ul>
);
export default NavigationItems;
