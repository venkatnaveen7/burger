import React, { Component } from "react";
import Auxilary from "../../hoc/Auxilary";
import cssClasses from "./app-layout.module.css";
const AppLayout = props => (
  <Auxilary>
    <div>Toolbar,Slidebar,Backdrop</div>
    <main className={cssClasses.Content}>{props.children}</main>
  </Auxilary>
);

export default AppLayout;
