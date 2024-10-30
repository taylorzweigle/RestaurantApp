//Taylor Zweigle, 2024
import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Flex, Typography } from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";

import RestaurantForm from "../components/forms/RestaurantForm";

const CreateRestaurantPage = () => {
  const navigate = useNavigate();

  return (
    <Flex vertical gap="middle" className="p-4">
      <Flex justify="space-between">
        <Button
          color="default"
          variant="text"
          shape="circle"
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
