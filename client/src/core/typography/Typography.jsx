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
      colorClass = "text-slate-800";
      break;
    case "secondary":
      colorClass = "text-slate-500";
      break;
    case "error":
      colorClass = "text-rose-500";
      break;
    case "base":
      colorClass = "text-white";
      break;
    case "custom":
      colorClass = customColor;
      break;
    default:
      colorClass = "text-slate-700";
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
