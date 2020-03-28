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
    totalPrice: 20,
    purchasable: false
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
    this.updatePurchasable(updatedIngredients);
  };

  updatePurchasable = updatedIngredients => {
    let obj = { ...updatedIngredients };
    let totalsum = Object.keys(obj)
      .map(ingKey => {
        return obj[ingKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    console.log("totalsum", totalsum);

    this.setState({ purchasable: totalsum > 0 });
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

    this.updatePurchasable(updatedIngredients);
  };

  render() {
    let disabledInfo = { ...this.state.ingredients };
    for (let ing in disabledInfo) {
      disabledInfo[ing] = disabledInfo[ing] <= 0;
    }
    console.log("disabledInfo", disabledInfo);
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}></Burger>
        <BuildControls
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
          disabledInfo={disabledInfo}
          totalPrice={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
