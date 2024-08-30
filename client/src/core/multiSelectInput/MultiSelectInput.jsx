//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import MultiSelectModal from "../../components/modals/MultiSelectModal";

const MultiSelectInput = ({ value, onChange }) => {
  const [count, setCount] = useState(0);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (value) {
      setCount(value.length);
    }
  }, [value]);

  const handleOnLocationSave = (cities) => {
    let newLocations = [];

    for (let i = 0; i < cities.length; i++) {
      newLocations.push({ city: cities[i], state: "TX" });
    }

    setCount(value.length + newLocations.length);
    onChange([...value, ...newLocations]);

    setOpen(false);
  };

  const handleOnLocationCancel = (cities) => {
    setCount(cities.length);
    onChange([...cities]);

    setOpen(false);
  };

  return (
    <>
      <MultiSelectModal
        open={open}
        data={value}
        loading={false}
        onSaveClick={(cities) => handleOnLocationSave(cities)}
        onCancelClick={(cities) => handleOnLocationCancel(cities)}
      />
      <div
        className="flex items-center bg-slate-50 border hover:border-2 active:border-2 focus:border-2 border-slate-600 hover:border-teal-600 active:border-teal-600 focus:border-teal-600 text-slate-950 text-md w-full rounded-md px-6 h-12 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {`${count > 0 ? count : "0"} Location${!count || count > 1 ? "s" : ""}`}
      </div>
    </>
  );
};

export default MultiSelectInput;
