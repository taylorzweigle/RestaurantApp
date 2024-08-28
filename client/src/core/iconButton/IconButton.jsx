//Taylor Zweigle, 2024
import React from "react";

import DataUsageIcon from "@mui/icons-material/DataUsage";

const IconButton = ({ children, color, size, loading, onClick }) => {
  let colorClass = "";
  let sizeClass = "";

  switch (color) {
    case "default":
      colorClass =
        "bg-transparent dark:bg-transparent sm:hover:bg-slate-100 active:bg-slate-100 text-slate-800";
      break;
    case "primary":
      colorClass =
        "bg-transparent dark:bg-transparent sm:hover:bg-slate-100 active:bg-slate-100 text-teal-600";
      break;
    case "error":
      colorClass =
        "bg-transparent dark:bg-transparent sm:hover:bg-slate-100 active:bg-slate-100 text-rose-600";
      break;
    case "fade":
      colorClass =
        "bg-transparent dark:bg-transparent sm:hover:bg-slate-100 active:bg-slate-100 text-slate-600";
      break;
    default:
      colorClass =
        "bg-transparent dark:bg-transparent sm:hover:bg-slate-100 active:bg-slate-100 text-slate-800";
  }

  switch (size) {
    case "default":
      sizeClass = "min-w-12 min-h-12";
      break;
    case "small":
      sizeClass = "min-w-8 min-h-8";
      break;
    default:
      sizeClass = "min-w-12 min-h-12";
  }

  return (
    <button className={`${colorClass} ${sizeClass} rounded-full`} onClick={onClick}>
      <div className="flex flex-row gap-1 justify-center items-center">
        {loading && <DataUsageIcon className="animate-spin" />}
        {!loading && children ? children : null}
      </div>
    </button>
  );
};

export default IconButton;
