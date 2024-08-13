//Taylor Zweigle, 2024
import React from "react";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const RestaurantListItem = ({ restaurant, city, state, type, rating }) => {
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
      <div className="flex flex-col gap-0 p-4">
        <div className="text-lg">{restaurant}</div>
        <div className="text-md">{`${city}, ${state}`}</div>
        <div className="text-md">{type}</div>
        <div className="flex flex-row gap-0 pt-1">{renderStars(rating)}</div>
      </div>
      <div className="h-px w-full bg-slate-300">&nbsp;</div>
    </>
  );
};

export default RestaurantListItem;
