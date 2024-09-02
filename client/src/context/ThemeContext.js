//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions/actions";

export const ThemeContext = createContext();

export const themeReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_THEME:
      return state;
    case Actions.SET_THEME:
      return action.payload;
    default:
      return state;
  }
};

export const ThemeContextProvider = ({ children }) => {
  const [theme, dispatchTheme] = useReducer(themeReducer, "dark");

  return <ThemeContext.Provider value={{ theme, dispatchTheme }}>{children}</ThemeContext.Provider>;
};
