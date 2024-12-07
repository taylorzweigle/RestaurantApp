//Taylor Zweigle, 2024
import React from "react";

import { Modal, Typography } from "antd";

import ModalNoScroll from "../../utility/ModalNoScroll";

const DeleteLocationModal = ({ open, onDeleteClick, onCancelClick }) => {
  return (
    <ModalNoScroll open={open}>
      <Modal title="Delete Location" open={open} onOk={onDeleteClick} onCancel={onCancelClick}>
        <Typography.Text>Are you sure you want to delete this location?</Typography.Text>
      </Modal>
    </ModalNoScroll>
  );
};

export default DeleteLocationModal;
