import React, { Component } from "react";
import cssClasses from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import Orders from "../../Containers/Orders/Orders";

const NavigationItems = props => (
  <ul className={cssClasses.NavigationItems}>
    <NavigationItem link="/" active>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);
export default NavigationItems;
