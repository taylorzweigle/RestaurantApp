//Taylor Zweigle, 2024
import React, { useState } from "react";

import { Flex, Modal, Radio } from "antd";

import ModalNoScroll from "../../utility/ModalNoScroll";

const LocationsFilterModal = ({ open, categories, onSaveClick, onCancelClick }) => {
  const [value, setValue] = useState("");

  return (
    <ModalNoScroll open={open}>
      <Modal title="Filter" open={open} onOk={() => onSaveClick(value)} onCancel={onCancelClick}>
        <Radio.Group onChange={(e) => setValue(e.target.value)}>
          <Flex vertical>
            <Radio value="All">All</Radio>
            {categories &&
              categories.map((category) => (
                <Radio key={category} value={category}>
                  {category}
                </Radio>
              ))}
          </Flex>
        </Radio.Group>
      </Modal>
    </ModalNoScroll>
  );
};

export default LocationsFilterModal;
