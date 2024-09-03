//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const Tab = ({ value, selected, onClick }) => {
  return (
    <div
      className={`flex flex-row justify-center items-center h-12 w-full bg-transparent dark:bg-transparent sm:hover:bg-gray-100 sm:dark:hover:bg-gray-800 active:bg-gray-100 dark:active:gray-800 border-b-4 ${
        selected ? "border-teal-600 dark:border-teal-600" : "border-transparent dark:border-transparent"
      } cursor-pointer`}
      onClick={onClick}
    >
      <Typography variant="body1" color={selected ? "base" : "primary"} bold={selected}>
        {value}
      </Typography>
    </div>
  );
};

export default Tab;
