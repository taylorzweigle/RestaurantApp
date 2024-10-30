//Taylor Zweigle, 2024
import React, { useState } from "react";

import { Button, Flex, Form, Input, Typography } from "antd";

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
    <Form onFinish={handleSubmit} className="p-4">
      <Flex vertical justify="center" align="center">
        <img src={logo} alt="logo" width="128" height="128" />
        <Typography.Title level={4}>Restaurant App</Typography.Title>
        <Flex vertical gap="large">
          <Form.Item label="Username" required style={{ marginBottom: "0px" }}>
            <Input value={username} size="large" onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item label="Password" required style={{ marginBottom: "0px" }}>
            <Input.Password value={password} size="large" onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          {error && <Typography.Text type="danger">{error}</Typography.Text>}
          <Button type="primary" onClick={handleSubmit}>
            {loading ? "O" : "Login"}
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
};

export default LoginPage;
