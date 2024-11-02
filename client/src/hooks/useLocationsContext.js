//Taylor Zweigle, 2024
import { useContext } from "react";

import { LocationsContext } from "../context/LocationsContext";

export const useLocationsContext = () => {
  const context = useContext(LocationsContext);

  if (!context) {
    throw Error("useLocationsContext must be used inside the LocationsContextProvider");
  }

  return context;
};
