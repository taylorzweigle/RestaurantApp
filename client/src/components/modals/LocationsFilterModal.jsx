//Taylor Zweigle, 2024
import React, { useState } from "react";

import { Button, Flex, Modal } from "antd";

import ModalNoScroll from "../../utility/ModalNoScroll";

const LocationsFilterModal = ({ open, categories, onSaveClick, onCancelClick }) => {
  const [value, setValue] = useState("All");

  return (
    <ModalNoScroll open={open}>
      <Modal title="Filter Locations" open={open} onOk={() => onSaveClick(value)} onCancel={onCancelClick}>
        <Flex wrap="wrap" gap="small" className="mt-4 mb-4">
          <Button
            color={value === "All" ? "primary" : "default"}
            variant={value === "All" ? "solid" : "outlined"}
            onClick={() => setValue("All")}
          >
            All
          </Button>
          {categories &&
            categories.map((category) => (
              <Button
                key={category}
                color={value === category ? "primary" : "default"}
                variant={value === category ? "solid" : "outlined"}
                onClick={() => setValue(category)}
              >
                {category}
              </Button>
            ))}
        </Flex>
      </Modal>
    </ModalNoScroll>
  );
};

export default LocationsFilterModal;
