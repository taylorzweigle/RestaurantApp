//Taylor Zweigle, 2024
import React, { useState } from "react";

import { CITIES } from "../../api/attributes";

import Checkbox from "../../core/checkbox/Checkbox";
import Modal from "../../core/modal/Modal";

const MultiSelectModal = ({ open, data, loading, onSaveClick, onCancelClick }) => {
  const [selecedCities, setSelectedCities] = useState([]);

  const handleOnClick = (selected, city) => {
    if (selected) {
      setSelectedCities([...selecedCities, city]);
    } else {
      setSelectedCities(selecedCities.filter((selectedCity) => selectedCity !== city));
    }
  };

  const handleOnSaveClick = () => {
    onSaveClick(selecedCities);
  };

  return (
    <Modal
      title="Locations"
      action="Save"
      open={open}
      loading={loading}
      onAction={handleOnSaveClick}
      onCancel={onCancelClick}
    >
      <div className="flex flex-col gap-2">
        {CITIES.map((city) => (
          <Checkbox
            key={city}
            value={city}
            defaultSelected={data ? data.map((city) => city.city).includes(city) : false}
            onClick={(selected) => handleOnClick(selected, city)}
          />
        ))}
      </div>
    </Modal>
  );
};

export default MultiSelectModal;
