//Taylor Zweigle, 2024
import React, { useState } from "react";

import { Flex, Tag, Typography } from "antd";

import { PlusOutlined } from "@ant-design/icons";

import LocationsModal from "../modals/LocationsModal";

const MultiSelectInput = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleSave = (locations) => {
    onChange(locations);

    setOpen(false);
  };

  return (
    <>
      <LocationsModal
        open={open}
        locations={options}
        defaultLocations={value}
        onSave={(locations) => handleSave(locations)}
        onCancelClick={() => setOpen(false)}
      />
      <div
        className="w-full min-h-10 p-2 bg-white border border-neutral-300 hover:border-blue-500 focus:border-blue-500 rounded-lg cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Flex justify="space-between" align="center">
          <Flex wrap gap={8} className="grow">
            {value && value.length > 0 ? (
              value.map((value) => (
                <Tag key={value} className="me-0">
                  <Typography.Text>{value}</Typography.Text>
                </Tag>
              ))
            ) : (
              <span>&nbsp;</span>
            )}
          </Flex>
          <PlusOutlined className="opacity-35" />
        </Flex>
      </div>
    </>
  );
};

export default MultiSelectInput;
