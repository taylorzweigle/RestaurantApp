//Taylor Zweigle, 2024
import React, { useState, useEffect, forwardRef } from "react";

import Typography from "../typography/Typography";

const SelectInput = forwardRef(({ label, value, options, error, ...props }, ref) => {
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (value) {
      setSelected(value);
    } else {
      setSelected(label);
    }
  }, [value, label]);

  return (
    <>
      <select
        ref={ref}
        defaultValue={label}
        {...props}
        className={`bg-slate-50 border border-slate-600 hover:border-teal-600 ${
          selected === label ? "text-slate-400" : "text-slate-950"
        } text-md w-full rounded-md px-6 h-12 appearance-none`}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="" hidden>
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-white text-slate-950">
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
