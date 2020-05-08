import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 1,
  error: false,
  buildingBurger: false
};

const INGREDIENT_PRICE = { salad: 1, cheese: 3, meat: 5, bacon: 7 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        buildingBurger: true
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice:
          state.totalPrice - INGREDIENT_PRICE[action.ingredientName] > 1
            ? state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            : 1,
        buildingBurger: true
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 1,
        buildingBurger: false
      };
    case actionTypes.FAILED_TO_LOAD_INGREDIENTS:
      return { ...state, error: true };
    default:
      return state;
  }
};

export default reducer;
