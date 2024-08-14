//Taylor Zweigle, 2024
import React from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const RestaurantListItem = ({ restaurant, city, state, type, rating, cost }) => {
  const renderStars = (count) => {
    let stars = [];

    for (let i = 0; i < count; i++) {
      stars.push(<StarIcon key={i} fontSize="small" />);
    }

    for (let i = count; i < 5; i++) {
      stars.push(<StarBorderIcon key={i} fontSize="small" />);
    }

    return stars;
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center p-4 cursor-pointer">
        <div className="flex flex-col gap-0">
          <div className="text-lg">{restaurant}</div>
          <div className="text-md">{`${city}, ${state}`}</div>
          <div className="text-md">{`${type} | ${cost}`}</div>
          <div className="flex flex-row gap-0 pt-1">{renderStars(rating)}</div>
        </div>
        <ChevronRightIcon fontSize="medium" />
      </div>
      <div className="h-px w-full bg-slate-300" />
    </>
  );
};

export default RestaurantListItem;
