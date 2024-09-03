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
        className={`bg-gray-50 dark:bg-gray-950 border-2 border-gray-400 dark:border-gray-700 sm:hover:border-teal-500 sm:dark:hover:border-teal-500 active:border-teal-500 dark:active:border-teal-500 focus:outline-none focus-visible:border-teal-500 dark:focus-visible:border-teal-500 ${
          selected === label ? "text-gray-400 dark:gray-800" : "text-gray-800 dark:text-gray-200"
        } text-md w-full rounded-md px-6 h-12 appearance-none cursor-pointer`}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="" hidden>
          {label}
        </option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200"
          >
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
