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
        className="bg-slate-50 border border-slate-600 hover:border-teal-600 text-slate-950 text-md w-full rounded-full px-6 h-12"
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
