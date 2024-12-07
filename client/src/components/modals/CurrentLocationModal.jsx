//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import { Flex, Form, Modal, Select } from "antd";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useCurrentLocationContext } from "../../hooks/useCurrentLocationContext";
import { useLocationsContext } from "../../hooks/useLocationsContext";
import ModalNoScroll from "../../utility/ModalNoScroll";

const CurrentLocationModal = ({ open, onSaveClick, onCancelClick }) => {
  const { user } = useAuthContext();
  const { currentLocation } = useCurrentLocationContext();
  const { locations } = useLocationsContext();

  const [selectedCurrentLocation, setSelectedCurrentLocation] = useState("");
  const [locationCategories, setLocationCategories] = useState([]);

  useEffect(() => {
    if (currentLocation) {
      setSelectedCurrentLocation(currentLocation);
    }
  }, [currentLocation]);

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

  return (
    <ModalNoScroll open={open}>
      <Modal
        title="Set Current Location"
        open={open}
        onOk={() => onSaveClick(selectedCurrentLocation)}
        onCancel={onCancelClick}
      >
        <Form>
          <Flex vertical>
            <Form.Item label="Location Category" required style={{ marginBottom: "0px" }}>
              <Select
                value={selectedCurrentLocation}
                size="large"
                options={
                  locationCategories
                    ? locationCategories.map((cat) => {
                        return {
                          label: cat,
                          value: cat,
                        };
                      })
                    : []
                }
                onChange={(value) => setSelectedCurrentLocation(value)}
              />
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </ModalNoScroll>
  );
};

export default CurrentLocationModal;
