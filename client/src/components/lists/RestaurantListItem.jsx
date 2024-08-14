//Taylor Zweigle, 2024
import React from "react";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const RestaurantListItem = ({ restaurant, city, state, type, rating, cost, visited }) => {
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
    <div className="flex flex-row justify-between items-center p-4 bg-white hover:bg-slate-100 border border-slate-400 rounded-md cursor-pointer">
      <div className="flex flex-col gap-0">
        <div className="flex flex-row items-center gap-2">
          {!visited && <AutoAwesomeIcon className="text-sky-600" />}
          <div className="text-lg font-semibold">{restaurant}</div>
        </div>
        <div className="text-md">{`${city}, ${state}`}</div>
        <div className="text-md">{`${type} | ${cost}`}</div>
        {rating && <div className="flex flex-row gap-0 pt-1">{renderStars(rating)}</div>}
      </div>
      <ChevronRightIcon fontSize="medium" />
    </div>
  );
};

export default RestaurantListItem;
