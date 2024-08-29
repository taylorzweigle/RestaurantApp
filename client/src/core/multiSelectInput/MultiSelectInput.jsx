//Taylor Zweigle, 2024
import React from "react";

const MultiSelectInput = ({ count, onClick }) => {
  return (
    <div
      className="flex items-center bg-slate-50 border hover:border-2 active:border-2 focus:border-2 border-slate-600 hover:border-teal-600 active:border-teal-600 focus:border-teal-600 text-slate-950 text-md w-full rounded-md px-6 h-12 cursor-pointer"
      onClick={onClick}
    >
      {`${count ? count : "0"} Location${!count || count > 1 ? "s" : ""}`}
    </div>
  );
};

export default MultiSelectInput;
