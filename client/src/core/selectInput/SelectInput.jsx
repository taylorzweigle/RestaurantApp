//Taylor Zweigle, 2024
import React, { useState, forwardRef } from "react";

import Typography from "../typography/Typography";

const SelectInput = forwardRef(({ label, options, error, ...props }, ref) => {
  const [selected, setSelected] = useState(label);

  return (
    <>
      <select
        ref={ref}
        defaultValue={label}
        {...props}
        className={`bg-white border border-slate-400 hover:border-teal-600 ${
          selected === label ? "text-slate-400" : "text-slate-950"
        } text-md w-full rounded-full px-4 h-12`}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="" hidden>
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-slate-950">
            {option}
          </option>
        ))}
      </select>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </>
  );
});

export default SelectInput;
