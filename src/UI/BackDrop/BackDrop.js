import React, { Component } from "react";
import cssClasses from "./BackDrop.module.css";

const BackDrop = props => {
  return props.show ? (
    <div className={cssClasses.BackDrop} onClick={props.modalClose}></div>
  ) : null;
};

export default BackDrop;
