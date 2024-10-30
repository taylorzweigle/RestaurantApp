//Taylor Zweigle, 2024
import React from "react";
import { Link } from "react-router-dom";

import { Flex, Tag, Typography } from "antd";

import { StarFilled } from "@ant-design/icons";

const RestaurantListItem = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant._id}`}>
      <Flex vertical gap="small" className="bg-white p-3 rounded-md drop-shadow">
        <Flex justify="space-between">
          <Flex vertical>
            <Typography.Title level={5} style={{ lineHeight: 1 }}>
              {restaurant.restaurant}
            </Typography.Title>
            <Typography.Text>{restaurant.type}</Typography.Text>
          </Flex>
          <Flex>
            <span>
              {restaurant.rating ? (
                <Tag color="gold" icon={<StarFilled />}>
                  {restaurant.rating}
                </Tag>
              ) : (
                <Tag color="blue">Todo</Tag>
              )}
            </span>
            <span>
              <Tag color="green">
                <Typography.Text type="success" strong>
                  {restaurant.cost}
                </Typography.Text>
              </Tag>
            </span>
          </Flex>
        </Flex>
        <Flex wrap="flex-wrap">
          {restaurant.locations.map((location) => (
            <Tag key={location.city}>{location.city}</Tag>
          ))}
        </Flex>
      </Flex>
    </Link>
  );
};

export default RestaurantListItem;
