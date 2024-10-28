//Taylor Zweigle, 2024
import React from "react";
import { Link } from "react-router-dom";

import { Rate, Tag, Typography } from "antd";

const RestaurantListItem = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant._id}`}>
      <div className="flex flex-row justify-between items-start bg-white active:bg-gray-200 dark:bg-gray-950 dark:active:bg-gray-900 border-b border-gray-400 dark:border-gray-700 pt-3 pr-4 pb-3 pl-4">
        <div className="flex flex-col gap-0">
          <div className="flex flex-row items-center gap-2">
            <Typography.Title level={5} style={{ lineHeight: 1 }}>
              {restaurant.restaurant}
            </Typography.Title>
          </div>
          <div className="flex flex-col gap-1">
            <Typography.Text>{`${restaurant.type} | ${restaurant.cost}`}</Typography.Text>
            <div className="flex flex-row flex-wrap items-center gap-0">
              {restaurant.locations.map((location) => (
                <Tag key={location.city}>{`${location.city}, ${location.state}`}</Tag>
              ))}
            </div>
            <span>
              {restaurant.rating ? (
                <Rate value={parseInt(restaurant.rating)} allowHalf disabled />
              ) : (
                <Tag color="magenta">Todo</Tag>
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantListItem;
