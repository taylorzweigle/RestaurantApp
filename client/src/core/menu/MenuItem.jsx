//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const MenuItem = ({ children, onClick }) => {
  return (
    <div
      className="flex flex-row items-center bg-white dark:bg-gray-950 sm:hover:bg-gray-100 sm:dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-800 h-10 w-48 p-4 cursor-pointer"
      onClick={onClick}
    >
      <Typography variant="body1">{children}</Typography>
    </div>
  );
};

export default MenuItem;
