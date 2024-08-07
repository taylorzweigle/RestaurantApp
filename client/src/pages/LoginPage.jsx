//Taylor Zweigle, 2024
import React, { useState } from "react";

import { useLogin } from "../hooks/useLogin";

import logo from "../img/Logo.svg";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <img src={logo} alt="logo" width="128" height="128" />
      <input label="Username" type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
      <input
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {error && <p>{error}</p>}
      <button>{loading ? "O" : "Login"}</button>
    </form>
  );
};

export default LoginPage;
