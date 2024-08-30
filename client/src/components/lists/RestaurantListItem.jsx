//Taylor Zweigle, 2024
import React from "react";
import { Link } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import IconButton from "../../core/iconButton/IconButton";
import Tag from "../../core/tag/Tag";
import Typography from "../../core/typography/Typography";

const RestaurantListItem = ({ restaurant }) => {
  const renderStars = (count) => {
    let stars = [];

    for (let i = 0; i < count; i++) {
      stars.push(<StarIcon key={i} fontSize="xsmall" className="text-amber-500" />);
    }

    for (let i = count; i < 5; i++) {
      stars.push(<StarBorderIcon key={i} fontSize="xsmall" className="text-slate-400" />);
    }

    return stars;
  };

  return (
    <div className="flex flex-row justify-between items-start bg-white border-b border-slate-400 pt-3 pr-4 pb-3 pl-4">
      <div className="flex flex-col gap-0">
        <div className="flex flex-row items-center gap-2">
          <Typography variant="body1" bold>
            {restaurant.restaurant}
          </Typography>
        </div>
        <div className="flex flex-col gap-1">
          <Typography variant="body2">{`${restaurant.type} | ${restaurant.cost}`}</Typography>
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
      <Link to={`/restaurant/${restaurant._id}`}>
        <IconButton color="fade" size="small">
          <EditIcon />
        </IconButton>
      </Link>
    </div>
  );
};

export default RestaurantListItem;
