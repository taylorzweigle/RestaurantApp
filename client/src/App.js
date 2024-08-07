//Taylor Zweigle, 2024
import React from "react";
import { Route, Routes, Navigate } from "react-router";
import { useAuthContext } from "./hooks/useAuthContext";

import ScrollToTop from "./utility/ScrollToTop";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RestaurantFormPage from "./pages/RestaurantFormPage";

const App = () => {
  const { user } = useAuthContext();

  return (
    <ScrollToTop>
      <Routes>
        <Route path="/restaurant/:id" element={user ? <RestaurantFormPage /> : <Navigate to="/login" />} />
        <Route path="/restaurant" element={user ? <RestaurantFormPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </ScrollToTop>
  );
};

export default App;
