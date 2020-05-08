import React, { Component } from "react";
import Order from "../../Components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/WithError/WithError";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/index";
import RoundRoundRoundGiraGira from "../../UI/Spinner/Spinner";
class Orders extends Component {
  /* state = {
    orders: []
  }; */
  componentDidMount() {
    this.props.fetchOrders(this.props.token);
  }

  render() {
    let orders = <RoundRoundRoundGiraGira />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          ingredients={order.burgerDetails.ingredients}
          key={order.id}
          price={order.price}
        />
      ));
    }

    return <div>{orders}</div>;
  }
}

const mapPropsToState = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.ordersloading,
    token: state.auth.token
  };
};

const mapPropsToDispatch = dispatch => {
  return {
    fetchOrders: token => dispatch(actionTypes.fetchOrders(token))
  };
};

export default connect(
  mapPropsToState,
  mapPropsToDispatch
)(withErrorHandler(Orders, axios));
