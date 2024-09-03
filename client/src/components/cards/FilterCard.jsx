//Taylor Zweigle, 2024
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Typography from "../../core/typography/Typography";

const FilterCard = ({ variant, type, value, displayValue, count }) => {
  const naviagte = useNavigate();

  const [searchParams] = useSearchParams({ attribute: "", query: "" });

  let variantClass = "";

  switch (variant) {
    case "portrait":
      variantClass = "flex flex-col gap-0 justify-center items-center h-16 min-w-24";
      break;
    case "landscape":
      variantClass = "flex flex-row justify-between items-center h-12 w-full pl-4 pr-4";
      break;
    default:
      variantClass = "flex flex-col gap-0 justify-center items-center h-16 min-w-24";
      break;
  }

  const handleOnClick = () => {
    searchParams.set("attribute", type);
    searchParams.set("query", value);

    naviagte(`/restaurants?attribute=${type}&query=${value}`);
  };

  return (
    <div
      className={`${variantClass} bg-gray-100 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 sm:hover:border-teal-500 sm:dark:hover:border-teal-500 active:border-teal-500 dark:active:border-teal-500 rounded-md cursor-pointer`}
      onClick={handleOnClick}
    >
      <Typography variant="caption" color="primary">
        <span className="flex flex-row gap-0">{displayValue}</span>
      </Typography>
      <Typography variant="subheading" color="primary">
        {count}
      </Typography>
    </div>
  );
};

export default FilterCard;
