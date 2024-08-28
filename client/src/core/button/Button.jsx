//Taylor Zweigle, 2024
import React from "react";

import DataUsageIcon from "@mui/icons-material/DataUsage";

import Typography from "../typography/Typography";

const Button = ({ children, variant, loading, onClick }) => {
  let variantClass = "";

  switch (variant) {
    case "default":
      variantClass =
        "bg-slate-200 dark:bg-slate-700 sm:hover:bg-slate-300 sm:dark:hover:bg-slate-600 active:bg-slate-300 active:dark:bg-slate-600";
      break;
    case "primary":
      variantClass =
        "bg-teal-600 dark:bg-teal-700 sm:hover:bg-teal-500 sm:dark:hover:bg-teal-600 active:bg-teal-500 active:dark:bg-teal-500";
      break;
    case "error":
      variantClass =
        "bg-rose-500 dark:bg-rose-700 sm:hover:bg-rose-600 sm:dark:hover:bg-rose-600 active:bg-rose-600 active:dark:bg-rose-600";
      break;
    case "text":
      variantClass =
        "bg-transparent dark:bg-transparent sm:hover:bg-slate-200 sm:dark:hover:bg-slate-200 active:bg-slate-200 active:dark:bg-slate-200";
      break;
    default:
      variantClass =
        "bg-slate-200 dark:bg-slate-700 sm:hover:bg-slate-300 sm:dark:hover:bg-slate-600 active:bg-slate-300 active:dark:bg-slate-600";
  }

  return (
    <button className={`${variantClass} h-10 px-3 rounded-md`} onClick={onClick}>
      <div className="flex flex-row gap-1 justify-center items-center">
        {loading && <DataUsageIcon className="text-slate-700 dark:text-white animate-spin" />}
        {!loading && children ? (
          <Typography
            variant="body2"
            color={variant === "primary" || variant === "error" ? "base" : "primary"}
          >
            {children}
          </Typography>
        ) : null}
      </div>
    </button>
  );
};

export default Button;
