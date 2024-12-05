//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Flex, Skeleton, Typography } from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";

import { useAuthContext } from "../hooks/useAuthContext";

import { getRestaurant } from "../api/restaurants";

import RestaurantForm from "../components/forms/RestaurantForm";

const EditRestaurantPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const [data, setData] = useState();

  useEffect(() => {
    const fetchRestaurant = async () => {
      const json = await getRestaurant(params.id, user.token, params.category);

      if (json.json) {
        setData({
          restaurant: json.json.restaurant,
          locations: json.json.locations,
          type: json.json.type,
          rating: json.json.rating,
          cost: json.json.cost,
          visited: json.json.visited ? "Yes" : "No",
        });
      }
    };

    if (params.id && user) {
      fetchRestaurant();
    }
  }, [params, user]);

  const renderSkeleton = (count) => {
    const skeleton = [];

    for (let i = 0; i < count; i++) {
      skeleton.push(
        <Flex key={i} vertical gap="small">
          <Skeleton.Input loading={true} active={true} size="small" style={{ width: "50%" }} />
          <Skeleton.Input loading={true} active={true} size="large" style={{ width: "100%" }} />
        </Flex>
      );
    }

    return skeleton;
  };

  return (
    <Flex vertical gap="middle" className="bg-neutral-100 dark:bg-neutral-950 min-h-screen p-3">
      <Flex justify="space-between">
        <Button
          color="default"
          variant="text"
          shape="circle"
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        />
        <Typography.Title level={4}>Edit Restaurant</Typography.Title>
        <span className="w-8">&nbsp;</span>
      </Flex>
      {data ? (
        <RestaurantForm id={params.id} category={params.category} data={data} edit />
      ) : (
        renderSkeleton(7)
      )}
    </Flex>
  );
};

export default EditRestaurantPage;
