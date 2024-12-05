//Taylor Zweigle, 2024
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";

import { AuthContextProvider } from "./context/AuthContext";
import { LocationsContextProvider } from "./context/LocationsContext";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import { ThemeContextProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <LocationsContextProvider>
        <RestaurantsContextProvider>
          <ThemeContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeContextProvider>
        </RestaurantsContextProvider>
      </LocationsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
