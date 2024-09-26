//Taylor Zweigle, 2024
import React, { forwardRef } from "react";

import CloseIcon from "@mui/icons-material/Close";

import IconButton from "../iconButton/IconButton";
import Typography from "../typography/Typography";

const TextInput = forwardRef(
  ({ type, label, value, clearable, error, onClick, onBlur, onChange, onClear, ...props }, ref) => {
    return (
      <>
        <input
          ref={ref}
          id={label}
          type={type}
          placeholder={label}
          value={value}
          onClick={onClick}
          onBlur={onBlur}
          onChange={onChange}
          {...props}
          className="bg-gray-50 dark:bg-gray-950 border-2 border-gray-400 dark:border-gray-700 sm:hover:border-teal-500 sm:dark:hover:border-teal-500 active:border-teal-500 dark:active:border-teal-500 focus:outline-none focus-visible:border-teal-500 dark:focus-visible:border-teal-500 text-gray-800 dark:text-gray-200 text-md w-full rounded-md px-6 h-12"
        />
        {clearable && value !== "" && (
          <span className="absolute pr-8 pt-2 right-0">
            <IconButton size="small" onClick={onClear}>
              <CloseIcon />
            </IconButton>
          </span>
        )}
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </>
    );
  }
);

export default TextInput;
