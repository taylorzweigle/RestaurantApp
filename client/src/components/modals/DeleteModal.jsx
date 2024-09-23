//Taylor Zweigle, 2024
import React from "react";

import Modal from "../../core/modal/Modal";
import Typography from "../../core/typography/Typography";

const DeleteModal = ({ open, loading, onDeleteClick, onCancelClick }) => {
  return (
    <Modal
      title="Delete"
      errorModal
      action="Delete"
      size="default"
      open={open}
      loading={loading}
      onAction={onDeleteClick}
      onCancel={onCancelClick}
    >
      <Typography variant="body1" color="primary">
        Are you sure you want to delete this restaurant?
      </Typography>
    </Modal>
  );
};

export default DeleteModal;
