//Taylor Zweigle, 2024
import { useContext } from "react";

import { CurrentLocationContext } from "../context/CurrentLocationContext";

export const useCurrentLocationContext = () => {
  const context = useContext(CurrentLocationContext);

  if (!context) {
    throw Error("useCurrentLocationContext must be used inside the CurrentLocationContextProvider");
  }

  return context;
};
