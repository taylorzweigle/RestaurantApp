//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions/actions";

export const LocationCategoryContext = createContext();

export const locationCategoryReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_LOCATION_CATEGORY:
      return { category: state.category };
    case Actions.SET_LOCATION_CATEGORY:
      return { category: action.payload };
    default:
      return state;
  }
};

export const LocationCategoryContextProvider = ({ children }) => {
  const [category, dispatchCategory] = useReducer(locationCategoryReducer, {
    category: "Dallas - Fort Worth",
  });

  return (
    <LocationCategoryContext.Provider value={{ ...category, dispatchCategory }}>
      {children}
    </LocationCategoryContext.Provider>
  );
};
