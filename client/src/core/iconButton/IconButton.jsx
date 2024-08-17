//Taylor Zweigle, 2024
import React from "react";

import DataUsageIcon from "@mui/icons-material/DataUsage";

const IconButton = ({ children, loading, onClick }) => {
  return (
    <button
      className={`bg-transparent dark:bg-transparent hover:bg-slate-100 active:bg-slate-100 rounded-full min-w-12 min-h-12`}
      onClick={onClick}
    >
      <div className="flex flex-row gap-1 justify-center items-center">
        {loading && <DataUsageIcon className="text-slate-700 animate-spin" />}
        {!loading && children ? children : null}
      </div>
    </button>
  );
};

export default IconButton;
