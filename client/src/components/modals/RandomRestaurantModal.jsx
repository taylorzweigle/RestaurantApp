//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import { Button, Modal } from "antd";

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
          <div className="mt-4 mb-4">
            <RestaurantListItem restaurant={randomRestaurant} />
          </div>
        )}
      </Modal>
    </ModalNoScroll>
  );
};

export default RandomRestaurantModal;
