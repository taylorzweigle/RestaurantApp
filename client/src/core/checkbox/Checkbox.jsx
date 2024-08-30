//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

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
    <span style={{ display: "flex", gap: "4px" }}>
      <input
        type="checkbox"
        id={value}
        name={value}
        value={value}
        checked={checked}
        onChange={() => handleOnChange(value)}
      />
      <label htmlFor={value}>{value}</label>
    </span>
  );
};

export default Checkbox;
