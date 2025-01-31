//Taylor Zweigle, 2025
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";

import { AuthContextProvider } from "./context/AuthContext";
import { CurrentLocationContextProvider } from "./context/CurrentLocationContext";
import { FiltersContextProvider } from "./context/FiltersContext";
import { LocationsContextProvider } from "./context/LocationsContext";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import { ThemeContextProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CurrentLocationContextProvider>
        <FiltersContextProvider>
          <LocationsContextProvider>
            <RestaurantsContextProvider>
              <ThemeContextProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </ThemeContextProvider>
            </RestaurantsContextProvider>
          </LocationsContextProvider>
        </FiltersContextProvider>
      </CurrentLocationContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
