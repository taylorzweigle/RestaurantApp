//Taylor Zweigle, 2024
import React from "react";

import DataUsageIcon from "@mui/icons-material/DataUsage";

import Typography from "../typography/Typography";

const Button = ({ children, variant, loading, onClick }) => {
  let variantClass = "";

  switch (variant) {
    case "default":
      variantClass =
        "bg-gray-500 dark:bg-gray-700 sm:hover:bg-gray-400 sm:dark:hover:bg-gray-600 active:bg-gray-400 active:dark:bg-gray-600";
      break;
    case "primary":
      variantClass =
        "bg-teal-600 dark:bg-teal-600 sm:hover:bg-teal-500 sm:dark:hover:bg-teal-500 active:bg-teal-500 active:dark:bg-teal-500";
      break;
    case "error":
      variantClass =
        "bg-rose-600 dark:bg-rose-700 sm:hover:bg-rose-500 sm:dark:hover:bg-rose-600 active:bg-rose-500 active:dark:bg-rose-600";
      break;
    case "text":
      variantClass =
        "bg-transparent dark:bg-transparent sm:hover:bg-gray-200 sm:dark:hover:bg-gray-800 active:bg-gray-200 active:dark:bg-gray-800";
      break;
    default:
      variantClass =
        "bg-gray-500 dark:bg-gray-700 sm:hover:bg-gray-400 sm:dark:hover:bg-gray-600 active:bg-gray-400 active:dark:bg-gray-600";
  }

  return (
    <button className={`${variantClass} h-10 px-3 rounded-md`} onClick={onClick}>
      <div className="flex flex-row gap-1 justify-center items-center">
        {loading && <DataUsageIcon className="text-white dark:text-white animate-spin" />}
        {!loading && children ? (
          <Typography variant="body2" color={variant === "text" ? "primary" : "base"}>
            {children}
          </Typography>
        ) : null}
      </div>
    </button>
  );
};

export default Button;
