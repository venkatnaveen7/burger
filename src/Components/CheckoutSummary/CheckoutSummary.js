import React, { Component } from "react";
import Burger from "../Burger/Burger";
import Button from "../Button/Button";
import cssClasses from "./CheckoutSummary.module.css";

const checkOutSummary = props => {
  return (
    <div className={cssClasses.CheckOutSummary}>
      <h1>Hmmm Baga Esav ga !</h1>
      <div style={{ margin: "auto", width: "100%" }}>
        <Burger ingredients={props.ingredients}></Burger>
      </div>
      <Button btnType="Danger" clicked={props.cancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkOutSummary;
