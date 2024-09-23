//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import Checkbox from "../checkbox/Checkbox";
import Modal from "../modal/Modal";

const MultiSelectInput = ({ values, defaultValues, onChange }) => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [tempValues, setTempValues] = useState([]);
  const [selectedValues, setSelectedValues] = useState();

  useEffect(() => {
    defaultValues && setTempValues([...defaultValues]);
  }, [defaultValues]);

  useEffect(() => {
    defaultValues && setSelectedValues([...defaultValues]);
  }, [defaultValues]);

  const handleOnChange = (value, checked) => {
    if (checked) {
      setSelectedValues([...selectedValues, value]);
    } else if (!checked) {
      setSelectedValues([...selectedValues.filter((v) => v !== value)]);
    }
  };

  const handleOnSaveClick = () => {
    setLoading(true);

    setTempValues([...selectedValues]);

    onChange([...selectedValues]);

    setOpen(false);

    setLoading(false);
  };

  const handleOnCancelClick = () => {
    setSelectedValues([...tempValues]);

    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Locations"
        action="Save"
        size="full"
        open={open}
        loading={loading}
        onAction={handleOnSaveClick}
        onCancel={handleOnCancelClick}
      >
        <div className="flex flex-col gap-3">
          {values &&
            values.map((value) => (
              <Checkbox
                key={value}
                value={value}
                defaultChecked={selectedValues ? selectedValues.includes(value) : false}
                onChange={(value, checked) => handleOnChange(value, checked)}
              />
            ))}
        </div>
      </Modal>
      <div
        className="flex items-center bg-gray-50 dark:bg-gray-950 border sm:hover:border-2 active:border-2 focus:border-2 border-gray-400 dark:border-gray-700 sm:hover:border-teal-500 sm:dark:hover:border-teal-500 active:border-teal-500 dark:active:border-teal-500 focus:border-teal-500 dark:focus:border-teal-500 text-gray-800 dark:text-gray-200 text-md w-full rounded-md px-6 h-12 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {`${tempValues.length > 0 ? tempValues.length : "0"} Location${
          !tempValues.length || tempValues.length > 1 ? "s" : ""
        }`}
      </div>
    </>
  );
};

export default MultiSelectInput;
