//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import { Checkbox, Flex, Input, Modal } from "antd";

import { SearchOutlined } from "@ant-design/icons";

const LocationsModal = ({ open, locations, defaultLocations, onSave, onCancelClick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredLocations, setFilteredLocations] = useState(locations);

  const [tempLocations, setTempLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  useEffect(() => {
    defaultLocations && setTempLocations([...defaultLocations]);
  }, [defaultLocations]);

  useEffect(() => {
    defaultLocations && setSelectedLocations([...defaultLocations]);
  }, [defaultLocations]);

  const handleOnChange = (location, checked) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, location]);
    } else {
      setSelectedLocations([...selectedLocations.filter((l) => l !== location)]);
    }
  };

  const handleOnSave = () => {
    setTempLocations([...selectedLocations]);

    onSave([...selectedLocations]);
  };

  const handleOnCancel = () => {
    setSelectedLocations([...tempLocations]);

    onCancelClick();
  };

  const handleOnSearch = (query) => {
    setSearchQuery(query);

    const filtered = locations.filter((location) =>
      location.city.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredLocations(filtered);
  };

  return (
    <Modal title="Locations" open={open} onOk={handleOnSave} onCancel={handleOnCancel}>
      <Flex vertical gap={16}>
        <Input
          size="large"
          placeholder="Search"
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => handleOnSearch(e.target.value)}
          allowClear
        />
        <Flex vertical gap={8}>
          {filteredLocations &&
            filteredLocations.map((location) => (
              <Checkbox
                key={location.city}
                defaultChecked={selectedLocations ? selectedLocations.includes(location.city) : false}
                checked={selectedLocations ? selectedLocations.includes(location.city) : false}
                onChange={(event) => handleOnChange(location.city, event.target.checked)}
              >
                {location.city}
              </Checkbox>
            ))}
        </Flex>
      </Flex>
    </Modal>
  );
};

export default LocationsModal;
