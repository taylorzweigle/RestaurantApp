//Taylor Zweigle, 2024
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";

import { AuthContextProvider } from "./context/AuthContext";
import { LocationsContextProvider } from "./context/LocationsContext";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <LocationsContextProvider>
        <RestaurantsContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RestaurantsContextProvider>
      </LocationsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
