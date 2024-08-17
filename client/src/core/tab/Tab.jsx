//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const Tab = ({ value, selected, onClick }) => {
  return (
    <div
      className={`flex flex-row justify-center items-center h-12 w-full bg-white hover:bg-slate-100 active:bg-slate-100 border-b-4 ${
        selected ? "border-teal-600" : "border-transparent"
      } cursor-pointer`}
      onClick={onClick}
    >
      <Typography
        variant="body1"
        color={selected ? "custom" : "primary"}
        customColor="text-teal-700"
        bold={selected}
      >
        {value}
      </Typography>
    </div>
  );
};

export default Tab;
