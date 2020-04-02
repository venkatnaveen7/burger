import React, { Component } from "react";
import Aux from "../../hoc/Auxilary/Auxilary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Components/OrderSummary/OrderSummary";

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
    purchasable: false,
    purchasing: false
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
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  modalClose = () => {
    this.setState({ purchasing: false });
  };

  continueOrder = () => {
    alert("Wait");
  };

  render() {
    let disabledInfo = { ...this.state.ingredients };
    for (let ing in disabledInfo) {
      disabledInfo[ing] = disabledInfo[ing] <= 0;
    }
    console.log("disabledInfo", disabledInfo);
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClose={this.modalClose}>
          <OrderSummary
            ingredients={this.state.ingredients}
            cancelOrder={this.modalClose}
            continueOrder={this.continueOrder}
            price={this.state.totalPrice}
          ></OrderSummary>
        </Modal>
        <Burger ingredients={this.state.ingredients}></Burger>
        <BuildControls
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
          disabledInfo={disabledInfo}
          totalPrice={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchaseHandler={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
