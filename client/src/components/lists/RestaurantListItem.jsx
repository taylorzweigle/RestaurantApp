//Taylor Zweigle, 2024
import React from "react";
import { Link } from "react-router-dom";

import { Flex, Tag, Typography } from "antd";

import { StarFilled } from "@ant-design/icons";

const RestaurantListItem = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant._id}`}>
      <Flex
        vertical
        gap="small"
        className="bg-white border active:border-blue-500 sm:hover:border-blue-500 p-3 rounded-xl drop-shadow"
      >
        <Flex justify="space-between" align="flex-start">
          <Flex vertical className="pt-2">
            <Typography.Title level={5} style={{ lineHeight: 0 }}>
              {restaurant.restaurant}
            </Typography.Title>
            <Typography.Text type="secondary">{restaurant.type}</Typography.Text>
          </Flex>
          <Flex>
            <span>
              {restaurant.rating ? (
                <Tag color="gold" icon={<StarFilled />}>
                  <Typography.Text type="warning">{restaurant.rating}</Typography.Text>
                </Tag>
              ) : (
                <Tag color="blue">Todo</Tag>
              )}
            </span>
            <span>
              <Tag color="green" style={{ marginInlineEnd: "0px" }}>
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
