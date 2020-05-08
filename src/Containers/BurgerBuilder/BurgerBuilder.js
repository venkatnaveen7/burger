import React, { Component } from "react";
import Aux from "../../hoc/Auxilary/Auxilary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import withError from "../../hoc/WithError/WithError";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    console.log("BurgerBuilder Mount", this.props);
    this.props.loadIngredients(this.props.token);
    /*  axios
      .get("ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: error });
      }); */
  }

  /*   removeIngredient = type => {
    let newCount = this.props.ingredients[type] - 1;
    let newPrice = 0; // this.state.totalPrice - INGREDIENT_PRICE[type];
    let updatedIngredients = { ...this.props.ingredients };
    updatedIngredients[type] = newCount;
    this.setState((oldState, props) => {
      return {
        totalPrice: newPrice,
        ingredients: updatedIngredients
      };
    });
    this.updatePurchasable(updatedIngredients);
  }; */

  updatePurchasable = () => {
    let obj = { ...this.props.ingredients };
    let totalsum = Object.keys(obj)
      .map(ingKey => {
        return obj[ingKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    console.log("totalsum", totalsum);

    return totalsum > 0;
  };

  /*   addIngredient = type => {
    let newCount = this.state.ingredients[type] + 1;
    let newPrice = 0; // INGREDIENT_PRICE[type] + this.state.totalPrice;
    let updatedIngredients = { ...this.props.ingredients };
    updatedIngredients[type] = newCount;
    this.setState((oldState, props) => {
      return {
        totalPrice: newPrice,
        ingredients: updatedIngredients
      };
    });

    this.updatePurchasable(updatedIngredients);
  }; */
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.setAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };
  modalClose = () => {
    this.setState({ purchasing: false });
  };

  continueOrder = () => {
    this.props.initPurchase();
    this.props.history.push("/checkout");
    /*  console.log("");
    let queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryParams.join("&")
    }); */
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
    let disabledInfo = { ...this.props.ingredients };

    let burgerDetails = this.props.error ? (
      <strong>INGREDIENTS NOT LOADED...!</strong>
    ) : (
      <Spinner />
    );
    let summary = null;
    if (this.props.ingredients) {
      burgerDetails = (
        <Aux>
          <Burger ingredients={this.props.ingredients}></Burger>
          <BuildControls
            isAuthenticated={this.props.isAuthenticated}
            addIngredient={ing => this.props.addIngredient(ing)}
            removeIngredient={ingType => this.props.removeIngredient(ingType)}
            disabledInfo={disabledInfo}
            totalPrice={this.props.totalPrice}
            purchasable={this.updatePurchasable()}
            purchaseHandler={this.purchaseHandler}
          />
        </Aux>
      );

      summary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          cancelOrder={this.modalClose}
          continueOrder={this.continueOrder}
          price={this.props.totalPrice}
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

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    purchased: state.orders.purchased,
    token: state.auth.token,
    isAuthenticated: state.auth.token != null
  };
};
const mapActionsToDispatch = dispatch => {
  return {
    addIngredient: ingredient =>
      dispatch(actionTypes.addIngredient(ingredient)),
    removeIngredient: ingredient =>
      dispatch(actionTypes.removeIngredient(ingredient)),
    loadIngredients: token => dispatch(actionTypes.loadIngredients(token)),
    initPurchase: () => dispatch(actionTypes.initBurgerPurchase()),
    setAuthRedirectPath: path => dispatch(actionTypes.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToDispatch
)(withError(BurgerBuilder, axios));
