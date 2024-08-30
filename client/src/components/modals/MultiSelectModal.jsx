//Taylor Zweigle, 2024
import React, { useState } from "react";

import { CITIES } from "../../api/attributes";

import Checkbox from "../../core/checkbox/Checkbox";
import Modal from "../../core/modal/Modal";

const MultiSelectModal = ({ open, data, loading, onSaveClick, onCancelClick }) => {
  const [selectedCities, setSelectedCities] = useState([]);

  const handleOnClick = (selected, city) => {
    if (selected) {
      setSelectedCities([...selectedCities, city]);
    } else if (!selected) {
      setSelectedCities([...selectedCities.filter((c) => c !== city)]);
    }
  };

  const handleOnCancelClick = () => {
    onCancelClick(data);
  };

  const handleOnSaveClick = () => {
    onSaveClick(selectedCities);
  };

  return (
    <Modal
      title="Locations"
      action="Save"
      open={open}
      loading={loading}
      onAction={handleOnSaveClick}
      onCancel={handleOnCancelClick}
    >
      <div className="flex flex-col gap-2">
        {CITIES.map((city) => (
          <Checkbox
            key={city}
            value={city}
            defaultSelected={data.map((city) => city.city).includes(city)}
            onClick={(selected) => handleOnClick(selected, city)}
          />
        ))}
      </div>
    </Modal>
  );
};

export default MultiSelectModal;
