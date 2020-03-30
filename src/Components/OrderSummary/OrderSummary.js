import React, { Component } from "react";
import Auxilary from "../../hoc/Auxilary";
import Button from "../Button/Button";

const OrderSummary = props => {
  const summary = Object.keys(props.ingredients).map(ingKey => (
    <li key={ingKey}>
      <span style={{ textTransform: "capitalize" }}>
        {ingKey} : {props.ingredients[ingKey]}
      </span>
    </li>
  ));

  return (
    <Auxilary>
      <h3>Order Summary </h3>
      <p>You Burger has belowitems :</p>
      <ul>{summary}</ul>
      <p>
        Total Price : <strong>{props.price.toFixed(2)} INR /-</strong>
      </p>
      {/*   <p>Do you want to Continue..?</p> */}
      <Button clicked={props.cancelOrder} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.continueOrder} btnType="Success">
        CONTINUE
      </Button>
    </Auxilary>
  );
};

export default OrderSummary;
