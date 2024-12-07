//Taylor Zweigle, 2024
import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";

import { ConfigProvider, theme as antdTheme } from "antd";

import * as Actions from "./actions/actions";

import { useAuthContext } from "./hooks/useAuthContext";
import { useCurrentLocationContext } from "./hooks/useCurrentLocationContext";
import { useThemeContext } from "./hooks/useThemeContext";

import ScrollToTop from "./utility/ScrollToTop";

import CreateRestaurantPage from "./pages/CreateRestaurantPage";
import EditRestaurantPage from "./pages/EditRestaurantPage";
import FiltersPage from "./pages/FiltersPage";
import LocationsPage from "./pages/LocationsPage";
import LoginPage from "./pages/LoginPage";
import RestaurantsPage from "./pages/RestaurantsPage";

const App = () => {
  const { user } = useAuthContext();
  const { currentLocation, dispatchCurrentLocation } = useCurrentLocationContext();
  const { theme, dispatchTheme } = useThemeContext();

  useEffect(() => {
    dispatchTheme({ type: Actions.GET_THEME });
  }, [dispatchTheme]);

  useEffect(() => {
    dispatchCurrentLocation({ type: Actions.GET_CURRENT_LOCATION });
  }, [dispatchCurrentLocation]);

  useEffect(() => {
    theme === "dark" && document.documentElement.classList.add("dark");
  });

  const { defaultAlgorithm, darkAlgorithm } = antdTheme;

  return (
    <ConfigProvider theme={{ algorithm: theme === "dark" ? darkAlgorithm : defaultAlgorithm }}>
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
            element={
              user ? (
                <Navigate
                  to={`/restaurants/${currentLocation ? currentLocation : "Dallas - Fort Worth"}`}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </ScrollToTop>
    </ConfigProvider>
  );
};

export default App;
