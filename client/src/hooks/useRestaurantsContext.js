//Taylor Zweigle, 2024
import { useContext } from "react";

import { RestaurantsContext } from "../context/RestaurantsContext";

export const useRestaurantsContext = () => {
  const context = useContext(RestaurantsContext);

  if (!context) {
    throw Error("useRestaurantsContext must be used inside the RestaurantsContextProvider");
  }

  return context;
};
