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
        className="bg-slate-50 border hover:border-2 active:border-2 focus:border-2 border-slate-600 hover:border-teal-600 active:border-teal-600 focus:border-teal-600 text-slate-950 text-md w-full rounded-md px-6 h-12"
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
