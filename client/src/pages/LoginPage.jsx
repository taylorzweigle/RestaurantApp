//Taylor Zweigle, 2024
import React, { useState } from "react";

import { useLogin } from "../hooks/useLogin";

import logo from "../img/Logo.svg";

import Button from "../core/button/Button";
import TextInput from "../core/textInput/TextInput";
import Typography from "../core/typography/Typography";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <div className="flex flex-row justify-center items-center w-full h-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-4 p-16 w-128">
          <img src={logo} alt="logo" width="128" height="128" />
          <Typography variant="title">Restaurant App</Typography>
          <TextInput
            label="Username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <TextInput
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <Button variant="primary">{loading ? "O" : "Login"}</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
