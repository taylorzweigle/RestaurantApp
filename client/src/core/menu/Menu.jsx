//Taylor Zweigle, 2024
import React from "react";

const Menu = ({ children, open, direction }) => {
  let directionClass = "";

  switch (direction) {
    case "left":
      directionClass = "left-4";
      break;
    case "right":
      directionClass = "right-4";
      break;
    default:
      directionClass = "left-4";
  }

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } absolute ${directionClass} bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md pt-2 pb-2 z-50`}
    >
      {children}
    </div>
  );
};

export default Menu;
