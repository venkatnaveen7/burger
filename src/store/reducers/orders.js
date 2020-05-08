import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  ordersloading: false,
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        ordersloading: true
      };

    case actionTypes.INIT_PURCHASE:
      return { ...state, purchased: false };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        ordersloading: false
      };
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        ordersloading: false
      };
    default:
      return state;
  }
};

export default reducer;
