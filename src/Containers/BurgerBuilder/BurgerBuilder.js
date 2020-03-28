import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICE = { salad: 10, cheese: 15, meat: 30, bacon: 15 };

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0
    },
    totalPrice: 20
  };
  removeIngredient = type => {
    let newCount = this.state.ingredients[type] - 1;
    let newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
    let updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;
    this.setState((oldState, props) => {
      return {
        totalPrice: newPrice,
        ingredients: updatedIngredients
      };
    });
  };

  addIngredient = type => {
    let newCount = this.state.ingredients[type] + 1;
    let newPrice = INGREDIENT_PRICE[type] + this.state.totalPrice;
    let updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;
    this.setState((oldState, props) => {
      return {
        totalPrice: newPrice,
        ingredients: updatedIngredients
      };
    });
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}></Burger>
        <BuildControls
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
