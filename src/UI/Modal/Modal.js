import React, { Component } from "react";
import cssClasses from "./Modal.module.css";
import BackDrop from "../BackDrop/BackDrop";
import Aux from "../../hoc/Auxilary";

const Modal = props => {
  return (
    <Aux>
      <BackDrop show={props.show} modalClose={props.modalClose}></BackDrop>
      <div
        className={cssClasses.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? 1 : 0
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;
