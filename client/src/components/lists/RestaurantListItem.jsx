//Taylor Zweigle, 2024
import React from "react";
import { Link } from "react-router-dom";

import { Flex, Tag, Typography } from "antd";

import { StarFilled } from "@ant-design/icons";

import { sortLocationsArray } from "../../utility/Sort";

const RestaurantListItem = ({ category, restaurant }) => {
  return (
    <Link to={`/restaurants/${category}/${restaurant._id}`}>
      <Flex
        vertical
        gap="small"
        className="bg-white dark:bg-stone-900 border active:border-blue-500 sm:hover:border-blue-500 p-3 rounded-xl drop-shadow"
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
    </Link>
  );
};

export default RestaurantListItem;
