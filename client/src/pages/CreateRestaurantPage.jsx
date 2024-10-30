//Taylor Zweigle, 2024
import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Flex, Typography } from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";

import RestaurantForm from "../components/forms/RestaurantForm";

const CreateRestaurantPage = () => {
  const navigate = useNavigate();

  return (
    <Flex vertical gap="middle" className="bg-gray-100 min-h-screen p-3">
      <Flex justify="space-between" align="center">
        <Button
          color="default"
          variant="text"
          shape="circle"
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        />
        <Typography.Title level={4}>Add Restaurant</Typography.Title>
        <span className="w-8">&nbsp;</span>
      </Flex>
      <RestaurantForm />
    </Flex>
  );
};

export default CreateRestaurantPage;
