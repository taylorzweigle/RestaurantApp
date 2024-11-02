//Taylor Zweigle, 2024
import React from "react";
import { Route, Routes, Navigate } from "react-router";

import { useAuthContext } from "./hooks/useAuthContext";

import ScrollToTop from "./utility/ScrollToTop";

import CreateRestaurantPage from "./pages/CreateRestaurantPage";
import EditRestaurantPage from "./pages/EditRestaurantPage";
import FiltersPage from "./pages/FiltersPage";
import LocationsPage from "./pages/LocationsPage";
import LoginPage from "./pages/LoginPage";
import RestaurantsPage from "./pages/RestaurantsPage";

const App = () => {
  const { user } = useAuthContext();

  return (
    <ScrollToTop>
      <Routes>
        <Route path="/restaurant/:id" element={user ? <EditRestaurantPage /> : <Navigate to="/login" />} />
        <Route path="/restaurant" element={user ? <CreateRestaurantPage /> : <Navigate to="/login" />} />
        <Route path="/locations" element={user ? <LocationsPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/filters" element={user ? <FiltersPage /> : <Navigate to="/login" />} />
        <Route path="/restaurants" element={user ? <RestaurantsPage /> : <Navigate to="/login" />} />
        <Route path="/" element={user ? <Navigate to="/restaurants" /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </ScrollToTop>
  );
};

export default App;
