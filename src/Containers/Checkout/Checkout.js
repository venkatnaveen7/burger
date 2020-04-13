import React, { Component } from "react";
import CheckoutSummary from "../../Components/CheckoutSummary/CheckoutSummary";
class CheckOut extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 2,
      meat: 2
    }
  };
  componentDidMount() {
    console.log("Chckout comp", this.props);
    const queryParams = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    for (let i of queryParams.entries()) {
      ingredients[i[0]] = i[1];
    }
    this.setState({ ingredients: ingredients });
  }

  cancel = () => {
    this.props.history.goBack();
  };

  continue = () => {
    this.props.history.replace("/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancel={this.cancel}
          continue={this.continue}
        ></CheckoutSummary>
      </div>
    );
  }
}

export default CheckOut;
