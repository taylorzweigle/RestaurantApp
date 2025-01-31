//Taylor Zweigle, 2025
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions/actions";

export const FiltersContext = createContext();

export const filtersReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_FILTERS:
      return { filters: action.payload };
    case Actions.CREATE_FILTER:
      return { filters: [action.payload, ...state.filters] };
    case Actions.DELETE_FILTER:
      return { filters: state.filters.filter((f) => f.filter !== action.payload.filter) };
    case Actions.RESET_FILTERS:
      return { filters: [] };
    default:
      return state;
  }
};

export const FiltersContextProvider = ({ children }) => {
  const [filters, dispatchFilters] = useReducer(filtersReducer, {
    filters: [],
  });

  return (
    <FiltersContext.Provider value={{ ...filters, dispatchFilters }}>{children}</FiltersContext.Provider>
  );
};
