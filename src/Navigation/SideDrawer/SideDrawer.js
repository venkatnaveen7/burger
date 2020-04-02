import React, { Component } from "react";
import classes from "./SideDrawer.module.css";
import Logo from "../../Components/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Aux from "../../hoc/Auxilary/Auxilary";

const sideDrawer = props => {
  let cssClasses = [classes.SideDrawer];
  if (props.show) {
    cssClasses[1] = classes.Open;
  } else cssClasses[1] = classes.Close;

  return (
    <Aux>
      <BackDrop show={props.show} modalClose={props.clicked}></BackDrop>
      <div className={cssClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo></Logo>
        </div>
        <nav>
          <NavigationItems></NavigationItems>
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
