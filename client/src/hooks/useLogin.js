//Taylor Zweigle, 2024
import { useState } from "react";

import * as ACTIONS from "../actions/actions";

import { useAuthContext } from "./useAuthContext";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://restaurant-app-server-ten.vercel.app"
    : "http://localhost:5000";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatchAuth } = useAuthContext();

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    const res = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const json = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatchAuth({ type: ACTIONS.LOGIN, payload: json });

      setLoading(false);
    }
  };

  return { login, error, loading };
};
