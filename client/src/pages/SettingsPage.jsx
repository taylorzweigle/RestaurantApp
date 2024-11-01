//Taylor Zweigle, 2024
import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Flex, Typography } from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <Flex vertical gap="middle" className="p-3">
      <Flex justify="space-between" align="center">
        <Button
          color="default"
          variant="filled"
          shape="circle"
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        />
        <Typography.Title level={4}>Settings</Typography.Title>
        <span className="w-8">&nbsp;</span>
      </Flex>
    </Flex>
  );
};

export default SettingsPage;
