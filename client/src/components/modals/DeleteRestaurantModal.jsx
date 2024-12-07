//Taylor Zweigle, 2024
import React from "react";

import { Modal, Typography } from "antd";

import ModalNoScroll from "../../utility/ModalNoScroll";

const DeleteRestaurantModal = ({ open, onDeleteClick, onCancelClick }) => {
  return (
    <ModalNoScroll open={open}>
      <Modal title="Delete Restaurant" open={open} onOk={onDeleteClick} onCancel={onCancelClick}>
        <Typography.Text>Are you sure you want to delete this restaurant?</Typography.Text>
      </Modal>
    </ModalNoScroll>
  );
};

export default DeleteRestaurantModal;
