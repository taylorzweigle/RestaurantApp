//Taylor Zweigle, 2024
import React, { useState } from "react";

import CheckIcon from "@mui/icons-material/Check";

import Typography from "../typography/Typography";

const Checkbox = ({ value, defaultSelected, onClick }) => {
  const [selected, setSelected] = useState(defaultSelected);

  const handleOnChange = () => {
    setSelected(!selected);
    onClick(!selected);
  };

  return (
    <label className="block relative pl-7 text-base text-slate-700 dark:text-white cursor-pointer">
      <Typography variant="body1" color="text-slate-500 dark:text-slate-400">
        {value}
      </Typography>
      <input
        type="checkbox"
        className="absolute opacity-0 h-0 w-0"
        checked={selected}
        onChange={handleOnChange}
      />
      <span
        className={`absolute flex justify-center items-center top-0 left-0 h-5 w-5 border border-slate-400 sm:hover:border-teal-500 rounded-md ${
          selected ? "bg-teal-600" : "bg-white"
        } `}
      >
        {selected && <CheckIcon className="text-white" fontSize="xsmall" />}
      </span>
    </label>
  );
};

export default Checkbox;
