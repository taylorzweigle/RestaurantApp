//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions/actions";

export const CurrentLocationContext = createContext();

export const currentLocationReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_CURRENT_LOCATION:
      return { currentLocation: JSON.parse(localStorage.getItem("location")) };
    case Actions.SET_CURRENT_LOCATION:
      localStorage.setItem("location", JSON.stringify(action.payload));
      return { currentLocation: action.payload };
    default:
      return state;
  }
};

export const CurrentLocationContextProvider = ({ children }) => {
  const [currentLocation, dispatchCurrentLocation] = useReducer(currentLocationReducer, {
    currentLocation: null,
  });

  return (
    <CurrentLocationContext.Provider value={{ ...currentLocation, dispatchCurrentLocation }}>
      {children}
    </CurrentLocationContext.Provider>
  );
};
