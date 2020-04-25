import React, { Component } from "react";
import CheckoutSummary from "../../Components/CheckoutSummary/CheckoutSummary";
import ContactData from "../../Containers/Checkout/Contact/Contact";
import { Route } from "react-router-dom";

class CheckOut extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };
  componentWillMount() {
    console.log("Checkout comp", this.props);
    const queryParams = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    let price = 0;
    for (let i of queryParams.entries()) {
      if (i[0] == "price") {
        price = i[1];
      } else ingredients[i[0]] = i[1];
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  cancel = () => {
    this.props.history.goBack();
  };

  continue = () => {
    console.log("this.props.match", this.props.match);
    this.props.history.replace(this.props.match.url + "/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancel={this.cancel}
          continue={this.continue}
        ></CheckoutSummary>
        <Route
          path={this.props.match.url + "/contact-data"}
          render={() => (
            <ContactData
              {...this.props}
              price={this.state.totalPrice}
              ingredients={this.state.ingredients}
            />
          )}
        ></Route>
      </div>
    );
  }
}

export default CheckOut;
