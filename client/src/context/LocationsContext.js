//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions/actions";

export const LocationsContext = createContext();

export const locationsReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_LOCATIONS:
      return { locations: action.payload };
    case Actions.CREATE_LOCATION:
      return { locations: [action.payload, ...state.locations] };
    case Actions.DELETE_LOCATION:
      return { locations: state.locations.filter((r) => r._id !== action.payload._id) };
    default:
      return state;
  }
};

export const LocationsContextProvider = ({ children }) => {
  const [locations, dispatchLocations] = useReducer(locationsReducer, {
    locations: null,
  });

  return (
    <LocationsContext.Provider value={{ ...locations, dispatchLocations }}>
      {children}
    </LocationsContext.Provider>
  );
};
