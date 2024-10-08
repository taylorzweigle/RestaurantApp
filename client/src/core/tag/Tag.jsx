//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const Tag = ({ children, color }) => {
  let colorClass = "";

  switch (color) {
    case "default":
      colorClass = "bg-gray-200 dark:bg-gray-700";
      break;
    case "primary":
      colorClass = "bg-teal-600 dark:bg-teal-600";
      break;
    default:
      colorClass = "bg-gray-200 dark:bg-gray-700";
  }

  return (
    <div className={`flex flex-row justify-center items-center ${colorClass} w-fit px-1 py-0 rounded-md`}>
      <Typography variant="caption" color={color === "primary" ? "base" : "primary"}>
        {children}
      </Typography>
    </div>
  );
};

export default Tag;
