//Taylor Zweigle, 2024
import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";

import { ConfigProvider, theme } from "antd";

import { useAuthContext } from "./hooks/useAuthContext";
import { useLocalStorage } from "./hooks/useLocalStorage";

import ScrollToTop from "./utility/ScrollToTop";

import CreateRestaurantPage from "./pages/CreateRestaurantPage";
import EditRestaurantPage from "./pages/EditRestaurantPage";
import FiltersPage from "./pages/FiltersPage";
import LocationsPage from "./pages/LocationsPage";
import LoginPage from "./pages/LoginPage";
import RestaurantsPage from "./pages/RestaurantsPage";

const App = () => {
  const { user } = useAuthContext();
  const [storageTheme] = useLocalStorage("theme", "dark");

  const { defaultAlgorithm, darkAlgorithm } = theme;

  useEffect(() => {
    storageTheme === "dark" && document.documentElement.classList.add("dark");
  });

  return (
    <ConfigProvider theme={{ algorithm: defaultAlgorithm }}>
      <ScrollToTop>
        <Routes>
          <Route
            path="/restaurants/:category/:id"
            element={user ? <EditRestaurantPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/restaurants/:category/create"
            element={user ? <CreateRestaurantPage /> : <Navigate to="/login" />}
          />
          <Route path="/locations" element={user ? <LocationsPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/:category/filters" element={user ? <FiltersPage /> : <Navigate to="/login" />} />
          <Route
            path="/restaurants/:category"
            element={user ? <RestaurantsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={user ? <Navigate to="/restaurants/Dallas - Fort Worth" /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </ScrollToTop>
    </ConfigProvider>
  );
};

export default App;
