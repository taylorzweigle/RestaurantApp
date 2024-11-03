//Taylor Zweigle, 2024
import { useContext } from "react";

import { LocationCategoryContext } from "../context/LocationCategoryContext";

export const useLocationCategoryContext = () => {
  const context = useContext(LocationCategoryContext);

  if (!context) {
    throw Error("useLocationCategoryContext must be used inside the LocationCategoryContextProvider");
  }

  return context;
};
