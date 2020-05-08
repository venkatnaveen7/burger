import React, { Component } from "react";
import tollbarCss from "./Toolbar.module.css";
import Logo from "../../Components/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggler from "../SideDrawer/DraweToggler/DrawerToggler";

const toolbar = props => (
  <div className={tollbarCss.Toolbar}>
    <DrawerToggler openSlideHandler={props.openSlideHandler}></DrawerToggler>
    <Logo />
    <nav className={tollbarCss.DesktopOnly}>
      <NavigationItems
        isAuthenticated={props.isAuthenticated}
      ></NavigationItems>
    </nav>
  </div>
);

export default toolbar;
