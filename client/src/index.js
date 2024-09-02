//Taylor Zweigle, 2024
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";

import { AuthContextProvider } from "./context/AuthContext";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import { ThemeContextProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RestaurantsContextProvider>
        <ThemeContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeContextProvider>
      </RestaurantsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
