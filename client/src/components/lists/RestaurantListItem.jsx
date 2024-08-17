//Taylor Zweigle, 2024
import React from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const RestaurantListItem = ({ restaurant }) => {
  const renderStars = (count) => {
    let stars = [];

    for (let i = 0; i < count; i++) {
      stars.push(<StarIcon key={i} fontSize="small" className="text-amber-600" />);
    }

    for (let i = count; i < 5; i++) {
      stars.push(<StarBorderIcon key={i} fontSize="small" className="text-slate-400" />);
    }

    return stars;
  };

  return (
    <div className="flex flex-row justify-between items-center bg-white hover:bg-slate-100 border-b border-slate-400 p-4 cursor-pointer">
      <div className="flex flex-col gap-0">
        <div className="flex flex-row items-center gap-2">
          <div className="text-lg font-semibold">{restaurant.restaurant}</div>
        </div>
        <div className="text-md">{`${restaurant.city}, ${restaurant.state}`}</div>
        <div className="text-md">{`${restaurant.type} | ${restaurant.cost}`}</div>
        {restaurant.rating && (
          <div className="flex flex-row gap-0 pt-1">{renderStars(restaurant.rating)}</div>
        )}
      </div>
      <ChevronRightIcon fontSize="medium" />
    </div>
  );
};

export default RestaurantListItem;
