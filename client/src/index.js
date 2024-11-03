//Taylor Zweigle, 2024
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";

import { AuthContextProvider } from "./context/AuthContext";
import { LocationsContextProvider } from "./context/LocationsContext";
import { LocationCategoryContextProvider } from "./context/LocationCategoryContext";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <LocationsContextProvider>
        <LocationCategoryContextProvider>
          <RestaurantsContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </RestaurantsContextProvider>
        </LocationCategoryContextProvider>
      </LocationsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
