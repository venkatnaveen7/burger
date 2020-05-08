import * as actionTypes from "./actionTypes";
import AXIOS from "../../axios-orders";

export const initBurgerPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE
  };
};

const burgerPurchaseSuccess = (responseData, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderData: { ...orderData, id: responseData.name }
  };
};

const burgerPurchaseFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

const burgerPurchase = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const startBurgerPurchase = orderData => {
  return (dispatch, getState) => {
    let token = getState().auth.token;
    dispatch(burgerPurchase());
    AXIOS.post("orders.json?auth=" + token, orderData)
      .then(response => {
        console.log("Order Saved", response);
        //this.setState({ loading: false });
        //this.props.history.push("/");
        dispatch(burgerPurchaseSuccess(response.data, orderData));
      })
      .catch(error => {
        console.log("Order Failed", error);
        //this.setState({ loading: false });
        dispatch(burgerPurchaseFail(error));
      });
  };
};

const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

const fetchOrdersFail = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED
  };
};

const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = token => {
  return dispatch => {
    dispatch(fetchOrderStart());
    let orders = [];
    AXIOS.get("/orders.json?auth=" + token)
      .then(res => {
        for (let key in res.data) {
          orders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(orders));
        // this.setState({ orders: orders });
      })
      .catch(err => {
        console.log("Error ", err);
        dispatch(fetchOrdersFail());
      });
  };
};
