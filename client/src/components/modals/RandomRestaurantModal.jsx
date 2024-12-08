//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import { Button, Flex, Modal, Typography } from "antd";

import ModalNoScroll from "../../utility/ModalNoScroll";

import RestaurantListItem from "../lists/RestaurantListItem";

const RandomRestaurantModal = ({ open, restaurants, onCancelClick }) => {
  const [randomRestaurant, setRandomRestaurant] = useState(null);

  useEffect(() => {
    if (open && restaurants) {
      setRandomRestaurant(restaurants[Math.floor(Math.random() * restaurants.length)]);
    }
  }, [open, restaurants]);

  return (
    <ModalNoScroll open={open}>
      <Modal
        title="Visit Random Restaurant"
        open={open}
        onCancel={onCancelClick}
        footer={[
          <Button key="close" onClick={onCancelClick}>
            Close
          </Button>,
        ]}
      >
        {randomRestaurant && (
          <Flex vertical gap="middle" className="mb-4">
            <Typography.Text>Here is your random restaurant!</Typography.Text>
            <RestaurantListItem restaurant={randomRestaurant} />
          </Flex>
        )}
      </Modal>
    </ModalNoScroll>
  );
};

export default RandomRestaurantModal;
