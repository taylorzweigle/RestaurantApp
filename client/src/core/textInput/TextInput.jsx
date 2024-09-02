//Taylor Zweigle, 2024
import React, { forwardRef } from "react";

import Typography from "../typography/Typography";

const TextInput = forwardRef(({ type, label, value, error, onChange, ...props }, ref) => {
  return (
    <>
      <input
        ref={ref}
        id={label}
        type={type}
        placeholder={label}
        value={value}
        {...props}
        onChange={onChange}
        className="bg-gray-50 dark:bg-gray-950 border sm:hover:border-2 active:border-2 focus:border-2 border-gray-400 dark:border-gray-700 sm:hover:border-teal-500 sm:dark:hover:border-teal-500 active:border-teal-500 dark:active:border-teal-500 text-gray-800 dark:text-gray-200 text-md w-full rounded-md px-6 h-12"
      />
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </>
  );
});

export default TextInput;
