//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import { Form, Modal } from "antd";

import LocationForm from "../forms/LocationForm";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useLocationsContext } from "../../hooks/useLocationsContext";

const NewLocationModal = ({ open, onSaveClick, onCancelClick }) => {
  const { user } = useAuthContext();
  const { locations } = useLocationsContext();

  const [form] = Form.useForm();

  const [locationCategories, setLocationCategories] = useState([]);

  useEffect(() => {
    const fetchLocationCategories = () => {
      if (locations) {
        const categories = locations.map((location) => location.category);

        setLocationCategories([...new Set(categories)].sort());
      }
    };

    if (user) {
      fetchLocationCategories();
    }
  }, [locations, user]);

  const handleOnSubmit = () => {
    form.submit();

    onSaveClick();
  };

  return (
    <Modal title="New Location" open={open} onOk={handleOnSubmit} onCancel={onCancelClick}>
      <LocationForm form={form} categories={locationCategories} onSubmit={handleOnSubmit} />
    </Modal>
  );
};

export default NewLocationModal;
