//Taylor Zweigle, 2024
import React, { forwardRef } from "react";

import Typography from "../typography/Typography";

const TextInput = forwardRef(({ type, label, error, ...props }, ref) => {
  return (
    <>
      <input
        ref={ref}
        id={label}
        type={type}
        placeholder={label}
        {...props}
        className="bg-white border border-slate-400 hover:border-teal-600 text-slate-950 text-md w-full rounded-full px-4 h-12"
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
