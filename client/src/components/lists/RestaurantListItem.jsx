//Taylor Zweigle, 2024
import React from "react";
import { Link } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import Tag from "../../core/tag/Tag";
import Typography from "../../core/typography/Typography";

const RestaurantListItem = ({ restaurant }) => {
  const renderStars = (count) => {
    let stars = [];

    for (let i = 0; i < count; i++) {
      stars.push(<StarIcon key={i} fontSize="xsmall" className="text-amber-500" />);
    }

    for (let i = count; i < 5; i++) {
      stars.push(<StarBorderIcon key={i} fontSize="xsmall" className="text-gray-400" />);
    }

    return stars;
  };

  return (
    <Link to={`/restaurant/${restaurant._id}`}>
      <div className="flex flex-row justify-between items-start bg-white dark:bg-gray-950 border-b border-gray-400 dark:border-gray-700 pt-3 pr-4 pb-3 pl-4">
        <div className="flex flex-col gap-0">
          <div className="flex flex-row items-center gap-2">
            <Typography variant="body1" color="primary" bold>
              {restaurant.restaurant}
            </Typography>
          </div>
          <div className="flex flex-col gap-1">
            <Typography
              variant="body2"
              color="secondary"
            >{`${restaurant.type} | ${restaurant.cost}`}</Typography>
            <div className="flex flex-row flex-wrap items-center gap-2">
              {restaurant.locations.map((location) => (
                <Tag color="default" key={location.city}>{`${location.city}, ${location.state}`}</Tag>
              ))}
            </div>
            {restaurant.rating ? (
              <div className="flex flex-row gap-0 pt-1">{renderStars(restaurant.rating)}</div>
            ) : (
              <Tag color="primary">Todo</Tag>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantListItem;
