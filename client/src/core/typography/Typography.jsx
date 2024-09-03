//Taylor Zweigle, 2024
import React from "react";

const Typography = ({ children, variant, color, customColor, bold, truncate, wrap, center }) => {
  let variantClass = "";
  let colorClass = "";

  switch (variant) {
    case "title":
      variantClass = "text-3xl";
      break;
    case "heading":
      variantClass = "text-xl";
      break;
    case "subheading":
      variantClass = "text-lg";
      break;
    case "body1":
      variantClass = "text-base";
      break;
    case "body2":
      variantClass = "text-sm";
      break;
    case "caption":
      variantClass = "text-xs";
      break;
    default:
      variantClass = "text-base";
  }

  switch (color) {
    case "primary":
      colorClass = "text-gray-800 dark:text-gray-300";
      break;
    case "secondary":
      colorClass = "text-gray-600 dark:text-gray-400";
      break;
    case "link":
      colorClass = "text-teal-600 dark:text-teal-600";
      break;
    case "error":
      colorClass = "text-rose-600 dark:text-rose-600";
      break;
    case "base":
      colorClass = "text-white dark:text-gray-200";
      break;
    case "custom":
      colorClass = customColor;
      break;
    default:
      colorClass = "text-gray-800 dark:text-gray-300";
  }

  return (
    <p
      className={`${variantClass} ${colorClass} ${bold ? "font-semibold" : null} ${
        truncate && "line-clamp-1"
      } ${wrap && "break-normal"} ${center && "text-center"}`}
    >
      {children}
    </p>
  );
};

export default Typography;
