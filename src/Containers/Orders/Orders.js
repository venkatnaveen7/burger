import React, { Component } from "react";
import Order from "../../Components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/WithError/WithError";

class Orders extends Component {
  state = {
    orders: []
  };
  componentDidMount() {
    let orders = [];
    axios
      .get("/orders.json")
      .then(res => {
        for (let key in res.data) {
          orders.push({ ...res.data[key], id: key });
        }
        this.setState({ orders: orders });
      })
      .catch(err => console.log("Error ", err));
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            ingredients={order.burgerDetails.ingredients}
            key={order.id}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
