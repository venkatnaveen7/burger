import React, { Component } from "react";
import Aux from "../../hoc/Auxilary/Auxilary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import withError from "../../hoc/WithError/WithError";

const INGREDIENT_PRICE = { salad: 10, cheese: 15, meat: 30, bacon: 15 };

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 20,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    console.log("BurgerBuilder Mount", this.props);
    axios
      .get("ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

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
    console.log("");
    let queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryParams.join("&")
    });
    //alert("Wait");
    /* this.setState({ loading: true });
    const orderData = {
      customeDetails: {
        name: "Raghu",
        mobilenum: "12346987",
        address: { DNO: " 11 -87", city: "Hyderabad" },
        email: "Data@data.com"
      },
      burgerDetails: {
        ingredients: this.state.ingredients
      },
      price: this.state.totalPrice
    };

    axios
      .post("orders.json", orderData)
      .then(response => {
        console.log("Order Saved", response);
        this.setState({ purchasing: false, loading: false });
      })
      .catch(error => {
        console.log("Order Failed", error);
        this.setState({ purchasing: false, loading: false });
      }); */
  };

  render() {
    let disabledInfo = { ...this.state.ingredients };

    let burgerDetails = this.state.error ? (
      <strong>INGREDIENTS NOT LOADED...!</strong>
    ) : (
      <Spinner />
    );
    let summary = null;
    if (this.state.ingredients) {
      burgerDetails = (
        <Aux>
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

      summary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelOrder={this.modalClose}
          continueOrder={this.continueOrder}
          price={this.state.totalPrice}
        ></OrderSummary>
      );
    }

    if (this.state.loading) {
      summary = <Spinner></Spinner>;
    }

    for (let ing in disabledInfo) {
      disabledInfo[ing] = disabledInfo[ing] <= 0;
    }
    console.log("disabledInfo", disabledInfo);
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClose={this.modalClose}>
          {summary}
        </Modal>
        {burgerDetails}
      </Aux>
    );
  }
}

export default withError(BurgerBuilder, axios);
