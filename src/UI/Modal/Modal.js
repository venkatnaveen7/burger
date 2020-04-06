import React, { Component } from "react";
import cssClasses from "./Modal.module.css";
import BackDrop from "../BackDrop/BackDrop";
import Aux from "../../hoc/Auxilary/Auxilary";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show != this.props.show ||
      nextProps.children != this.props.children
    );
  }

  componentWillUpdate() {
    console.log("Modal componentWillUpdate ");
  }

  render() {
    return (
      <Aux>
        <BackDrop
          show={this.props.show}
          modalClose={this.props.modalClose}
        ></BackDrop>
        <div
          className={cssClasses.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? 1 : 0
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
