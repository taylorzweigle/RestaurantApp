//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const Tag = ({ children }) => {
  return (
    <div className="flex flex-row justify-center items-center bg-slate-500/20 w-fit px-1 py-0 rounded-md">
      <Typography variant="caption" color="primary">
        {children}
      </Typography>
    </div>
  );
};

export default Tag;
