//Taylor Zweigle, 2024
import React from "react";

import { Modal, Typography } from "antd";

const LogoutModal = ({ open, loading, onLogoutClick, onCancelClick }) => {
  return (
    <Modal title="Logout" open={open} onOk={onLogoutClick} onCancel={onCancelClick}>
      <Typography.Text>Are you sure you want to logout?</Typography.Text>
    </Modal>
  );
};

export default LogoutModal;
