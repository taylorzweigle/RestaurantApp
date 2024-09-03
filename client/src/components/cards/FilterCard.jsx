//Taylor Zweigle, 2024
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Typography from "../../core/typography/Typography";

const FilterCard = ({ type, value, displayValue, count }) => {
  const naviagte = useNavigate();

  const [searchParams] = useSearchParams({ attribute: "", query: "" });

  const handleOnClick = () => {
    searchParams.set("attribute", type);
    searchParams.set("query", value);

    naviagte(`/restaurants?attribute=${type}&query=${value}`);
  };

  return (
    <div
      className="flex flex-col gap-0 justify-center items-center h-20 min-w-28 border-2 border-gray-300 dark:border-gray-600 sm:hover:border-teal-500 sm:dark:hover:border-teal-500 active:border-teal-500 dark:active:border-teal-500 rounded-md cursor-pointer"
      onClick={handleOnClick}
    >
      <Typography variant="body2" color="primary" bold>
        <span className="flex flex-row gap-0">{displayValue}</span>
      </Typography>
      <Typography variant="heading" color="primary">
        {count}
      </Typography>
    </div>
  );
};

export default FilterCard;
