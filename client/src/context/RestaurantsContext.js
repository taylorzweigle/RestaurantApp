//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions/actions";

export const RestaurantsContext = createContext();

export const restaurantsReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_RESTAURANTS:
      return { restaurants: action.payload };
    case Actions.CREATE_RESTAURANT:
      return { restaurants: [action.payload, ...state.restaurants] };
    case Actions.DELETE_RESTAURANT:
      return { restaurants: state.restaurants.filter((r) => r._id !== action.payload._id) };
    default:
      return state;
  }
};

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, dispatchRestaurants] = useReducer(restaurantsReducer, {
    restaurants: null,
  });

  return (
    <RestaurantsContext.Provider value={{ ...restaurants, dispatchRestaurants }}>
      {children}
    </RestaurantsContext.Provider>
  );
};
