//Taylor Zweigle, 2025
import React from "react";
import { useNavigate } from "react-router-dom";

import { Flex, Tag, Typography } from "antd";

import { StarFilled } from "@ant-design/icons";

import { sortLocationsArray } from "../../utility/Sort";

const RestaurantListItem = ({ category, restaurant }) => {
  const navigate = useNavigate();

  return (
    <Flex
      vertical
      gap="small"
      className="bg-white dark:bg-neutral-900 border border-white dark:border-neutral-800 active:border-blue-500 sm:hover:border-blue-500 w-full sm:max-w-128 p-3 rounded-xl drop-shadow cursor-pointer"
      onClick={() => navigate(`/restaurants/${category}/${restaurant._id}`)}
    >
      <Flex justify="space-between" align="flex-start">
        <Flex vertical>
          <Typography.Title level={5} style={{ marginBottom: "0px", lineHeight: "normal" }}>
            {restaurant.restaurant}
          </Typography.Title>
          <Typography.Text type="secondary">{restaurant.type}</Typography.Text>
        </Flex>
        <Flex>
          <span>
            {restaurant.visited ? (
              <Tag color="gold" icon={<StarFilled />}>
                <Typography.Text type="warning">
                  {(parseInt(restaurant.rating.husband) + parseInt(restaurant.rating.wife)) / 2}
                </Typography.Text>
              </Tag>
            ) : (
              <Tag color="blue">Todo</Tag>
            )}
          </span>
          <span>
            <Tag color="green" className="me-0">
              <Typography.Text type="success" strong>
                {restaurant.cost}
              </Typography.Text>
            </Tag>
          </span>
        </Flex>
      </Flex>
      <Flex wrap gap="small">
        {restaurant &&
          sortLocationsArray(restaurant.locations).map((location) => (
            <Tag key={location.city} className="me-0">
              {location.city}
            </Tag>
          ))}
      </Flex>
    </Flex>
  );
};

export default RestaurantListItem;
