//Taylor Zweigle, 2024
import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw Error("useThemeContext must be used inside the ThemeContextProvider");
  }

  return context;
};
