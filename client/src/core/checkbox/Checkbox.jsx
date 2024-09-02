//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import CheckIcon from "@mui/icons-material/Check";

import Typography from "../typography/Typography";

const Checkbox = ({ value, defaultChecked, onChange }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const handleOnChange = (value) => {
    setChecked(!checked);
    onChange(value, !checked);
  };

  return (
    <label className="block relative pl-8 text-base cursor-pointer">
      <Typography variant="body2" color="primary">
        {value}
      </Typography>
      <input
        type="checkbox"
        id={value}
        name={value}
        value={value}
        checked={checked}
        onChange={() => handleOnChange(value)}
        className="absolute opacity-0 h-0 w-0"
      />
      <span
        className={`absolute flex justify-center items-center top-0 left-0 h-6 w-6 border-2 border-gray-400 dark:border-gray-700 sm:hover:border-teal-500 sm:hover:dark:border-teal-500 active:border-teal-500 dark:active:border-teal-500 rounded-md ${
          checked ? "bg-teal-600 dark:bg-teal-600" : "bg-white dark:bg-gray-950"
        } `}
      >
        {checked && <CheckIcon className="text-white" fontSize="xsmall" />}
      </span>
    </label>
  );
};

export default Checkbox;
